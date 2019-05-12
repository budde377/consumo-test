import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import GlobalStyle, { Container } from './../styled';
import { Alert, Message, Placeholder } from '../styled';
import { useThrottle } from '../hooks';
import FilterForm from './FillterForm';
import CompanyList from './CompanyList';
import PlaceholderList from './PlaceholderList';

export const LIST_COMPANIES = gql`
  query($filter: CompanyFilter) {
    listCompanies(first: 50, filter: $filter) {
      edges {
        node {
          id
          name
          speciality
          city
          logo {
            url
          }
        }
        cursor
      }
      pageInfo {
        totalCount
      }
    }
  }
`;

export default ({ timeout = 500 }) => {
  const [filter, variables, update] = useThrottle(
    { name: null, speciality: [] },
    timeout
  ); // Use timeout for better UX
  return (
    <>
      <GlobalStyle />
      <Container>
        <Query query={LIST_COMPANIES} variables={{ filter: variables }}>
          {({ data, loading, error }) => {
            const edges =
              (data && data.listCompanies && data.listCompanies.edges) || [];
            const pageInfo =
              data && data.listCompanies && data.listCompanies.pageInfo;
            const l = loading || filter !== variables;
            return (
              <>
                <h1>Companies</h1>
                <FilterForm filter={filter} onChange={update} />
                {error && (
                  <Message>
                    <Alert />
                    {error.message}
                  </Message>
                )}
                <p>
                  {l ? (
                    <Placeholder />
                  ) : (
                    `Showing first ${edges.length} of ${
                      pageInfo ? pageInfo.totalCount : 0
                    }`
                  )}
                </p>
                {l ? (
                  <PlaceholderList />
                ) : (
                  <CompanyList
                    edges={edges}
                    onTagClick={type =>
                      update({ ...filter, speciality: [type] })
                    }
                  />
                )}
              </>
            );
          }}
        </Query>
      </Container>
    </>
  );
};
