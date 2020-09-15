import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { FaCheck, FaMapMarkerAlt } from "react-icons/fa";
import { AppNav } from "..";
import { Page, PageHeader, PageContent } from "../components/Page";
import { Table, TBody, Thead, Th, Tr, Td } from "../components/Table";
import { Overlay } from "../components/Overlay";
import { Spinner } from "../components/Spinner";
import styled from "styled-components";
import { Box } from "../components/Box";
import { STORAGE, THEME } from "../../constants";
import { Select } from "../components/Select";
import { Input } from "../components/Input";
import { useHistory } from "react-router-dom";
import { useStorage } from "./useStorage";

function Countries() {
  const history = useHistory();
  const { countries, loading } = useCountries();
  const [keyword, setKeyword] = useState("");
  const [marked, setMarked] = useState("");
  const [selected, setSelected] = useState([]);

  const [visited, setVisited] = useStorage(STORAGE.visited.id);
  const [wanted, setWanted] = useStorage(STORAGE.wanted.id);

  function byKeyword(country) {
    return keyword
      ? country.name.toLowerCase().startsWith(keyword.toLowerCase())
      : country;
  }

  return (
    <Page>
      <PageHeader>
        <AppNav />
      </PageHeader>

      <Toolbar padding={[0, 10]}>
        <ToolbarInfo>
          <Box margin={[0, 0, 0, 10]}>
            {Boolean(selected.length) && `${selected.length}/`}
            {countries.length} countries
          </Box>
        </ToolbarInfo>

        <ToolbarFilters margin={[8]}>
          <Input
            type="text"
            placeholder="Filter by country name"
            onChange={(e) => {
              setSelected([]);
              setKeyword(e.target.value);
            }}
          />
        </ToolbarFilters>

        <ToolbarActions>
          {Boolean(selected.length) && (
            <label>
              <Select
                name="Mark as"
                value={marked}
                onChange={(e) => {
                  const operation = e.target.value;
                  const filteredSelected = selected.map((s) => s);

                  setMarked("");

                  switch (operation) {
                    case "visited": {
                      return setVisited((visited) => [
                        ...new Set([...visited, ...filteredSelected]),
                      ]);
                    }
                    case "not-visited": {
                      return setVisited((visited) =>
                        visited.filter((id) => !filteredSelected.includes(id))
                      );
                    }
                    case "want-to-go": {
                      return setWanted((wanted) => [
                        ...new Set([...wanted, ...filteredSelected]),
                      ]);
                    }
                    case "do-not-want-to-go": {
                      return setWanted((wanted) =>
                        wanted.filter((id) => !filteredSelected.includes(id))
                      );
                    }
                    default:
                      return;
                  }
                }}
              >
                <option>Mark as</option>
                <option value="visited">Visited</option>
                <option value="not-visited">Not visited</option>
                <option value="want-to-go">Want to go</option>
                <option value="do-not-want-to-go">Do not want to go</option>
              </Select>
            </label>
          )}
        </ToolbarActions>
      </Toolbar>

      <PageContent>
        {loading && (
          <Overlay>
            <Spinner />
          </Overlay>
        )}
        <Table name="Countries">
          <colgroup>
            <col />
            <col />
            <col />
            <col width="300px" />
            <col />
            <col />
            <col />
            <col />
            <col width="90px" />
            <col width="90px" />
          </colgroup>
          <Thead>
            <Tr>
              <Th>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const isChecked = e?.target?.checked;
                    setSelected(() => {
                      const filtered = countries.filter(byKeyword);

                      return isChecked
                        ? filtered.map((country) => country.code)
                        : [];
                    });
                  }}
                />
              </Th>
              <Th>Flag</Th>
              <Th>Code</Th>
              <Th>Name</Th>
              <Th>Continent</Th>
              <Th>Capital</Th>
              <Th>Currency</Th>
              <Th>Language</Th>
              <Th align="center">Visited</Th>
              <Th align="center">Want to go</Th>
            </Tr>
          </Thead>
          <TBody>
            {countries.filter(byKeyword).map((country) => (
              <Tr
                key={country.code}
                onClick={() =>
                  history.push(`/countries/${country.code.toLowerCase()}`)
                }
              >
                <Td onClick={(e) => e.stopPropagation()}>
                  <Input
                    type="checkbox"
                    name={`${country.name} selector`}
                    checked={selected.includes(country.code)}
                    onChange={(e) => {
                      const isChecked = e.target.checked;

                      setSelected((selected) =>
                        isChecked
                          ? [...selected, country.code].filter(Boolean)
                          : selected.filter((id) => id !== country.code)
                      );
                    }}
                  />
                </Td>
                <Td>{country.emoji}</Td>
                <Td>{country.code}</Td>
                <Td>{country.name}</Td>
                <Td>{country.continent.name}</Td>
                <Td>{country.capital}</Td>
                <Td>{country.currency?.split(",")[0]}</Td>
                <Td>{country.languages.map((l) => l.name)[0]}</Td>
                <Td align="center" onClick={(e) => e.stopPropagation()}>
                  <label>
                    <VisitedInput
                      type="checkbox"
                      name="visited"
                      checked={visited.includes(country.code)}
                      onChange={(event) => {
                        const isChecked = event.target.checked;
                        setVisited((visited) =>
                          !isChecked
                            ? visited?.filter((l) => l !== country.code)
                            : [...visited, country.code]
                        );
                      }}
                    />
                    <FaCheck />
                  </label>
                </Td>
                <Td align="center" onClick={(e) => e.stopPropagation()}>
                  <label>
                    <WantedInput
                      type="checkbox"
                      name="wanted"
                      checked={wanted.includes(country.code)}
                      onChange={(event) => {
                        const isChecked = event.target.checked;
                        setWanted((wanted) =>
                          !isChecked
                            ? wanted?.filter((l) => l !== country.code)
                            : [...wanted, country.code]
                        );
                      }}
                    />
                    <FaMapMarkerAlt />
                  </label>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </PageContent>
    </Page>
  );
}

const IconInput = styled(Input)`
  display: none;

  &:checked,
  &:hover {
    & + * {
      opacity: 1;
    }
  }

  & + * {
    opacity: 0.2;
    color: inherit;
  }
`;

const VisitedInput = styled(IconInput)`
  &:checked,
  &:hover {
    & + * {
      color: green;
    }
  }
`;

const WantedInput = styled(IconInput)`
  &:checked,
  &:hover {
    & + * {
      color: dodgerblue;
    }
  }
`;

const ToolbarFilters = styled(Box)`
  align-items: center;
  justify-content: center;
`;

const Toolbar = styled(Box)`
  align-items: center;
  background: ${THEME.colors.palette.primary.base};
  color: ${THEME.colors.fg[1]};
  height: 40px;

  > * {
    width: 33.3%;
  }
`;

const ToolbarInfo = styled(Box)`
  justify-content: flex-start;
`;

const ToolbarActions = styled(Box)`
  align-items: center;
  justify-content: flex-end;
`;

function useCountries() {
  const response = useQuery(gql`
    query {
      countries {
        code
        name
        currency
        emoji
        capital
        continent {
          name
          code
        }
        languages {
          name
        }
      }

      continents {
        name
      }
    }
  `);

  const countries = response?.data?.countries || [];

  return { ...response, countries };
}

export { Countries, useCountries };
