import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';
import App, { LIST_COMPANIES } from '../App';
import PlaceholderList from '../PlaceholderList';
import wait from 'waait';
import CompanyList from '../CompanyList';
import {
  Container,
  Description,
  Form,
  List,
  ListItem,
  Message,
  Tag,
  Tags,
  Thumb,
} from '../../styled';

describe('App', () => {
  it('should render loading', async () => {
    const tree = renderer.create(
      <MockedProvider>
        <App />
      </MockedProvider>
    );
    tree.root.findByType(PlaceholderList);
    expect(tree.root.findAllByType(CompanyList)).toHaveLength(0);
  });
  it('should render error', async () => {
    const message = 'Test message';
    const tree = renderer.create(
      <MockedProvider
        mocks={[
          {
            request: {
              query: LIST_COMPANIES,
              variables: { filter: { name: null, speciality: [] } },
            },
            error: new Error(message),
          },
        ]}>
        <App />
      </MockedProvider>
    );
    await wait(0);
    expect(tree.root.findAllByType(PlaceholderList)).toHaveLength(0);
    expect(tree.root.findByType(Message).props.children.join('')).toContain(
      message
    );
  });
  it('should render error', async () => {
    const message = 'Test message';
    const tree = renderer.create(
      <MockedProvider
        mocks={[
          {
            request: {
              query: LIST_COMPANIES,
              variables: { filter: { name: null, speciality: [] } },
            },
            error: new Error(message),
          },
        ]}>
        <App />
      </MockedProvider>
    );
    await wait(0);
    expect(tree.root.findAllByType(PlaceholderList)).toHaveLength(0);
    expect(tree.root.findByType(Message).props.children.join('')).toContain(
      message
    );
  });
  it('should render data', async () => {
    const tree = renderer.create(
      <MockedProvider
        addTypename={false}
        mocks={[
          {
            request: {
              query: LIST_COMPANIES,
              variables: { filter: { name: null, speciality: [] } },
            },
            result: {
              data: {
                listCompanies: {
                  edges: [],
                  pageInfo: {
                    totalCount: 0,
                    hasNextPage: 0,
                    hasPreviousPage: 0,
                  },
                },
              },
            },
          },
        ]}>
        <App />
      </MockedProvider>
    );
    await wait(0);
    expect(tree.root.findAllByType(PlaceholderList)).toHaveLength(0);
    expect(
      tree.root.findByType(Container).findAllByType('p')[0].props.children
    ).toContain('Showing first 0 of 0');
  });
  it('should render count', async () => {
    const tree = renderer.create(
      <MockedProvider
        addTypename={false}
        mocks={[
          {
            request: {
              query: LIST_COMPANIES,
              variables: { filter: { name: null, speciality: [] } },
            },
            result: {
              data: {
                listCompanies: {
                  edges: [],
                  pageInfo: {
                    totalCount: 10,
                    hasNextPage: 0,
                    hasPreviousPage: 0,
                  },
                },
              },
            },
          },
        ]}>
        <App />
      </MockedProvider>
    );
    await wait(0);
    expect(tree.root.findAllByType(PlaceholderList)).toHaveLength(0);
    expect(
      tree.root.findByType(Container).findAllByType('p')[0].props.children
    ).toContain('Showing first 0 of 10');
  });
  it('should apply speciality filter', async () => {
    const tree = renderer.create(
      <MockedProvider
        addTypename={false}
        mocks={[
          {
            request: {
              query: LIST_COMPANIES,
              variables: { filter: { name: null, speciality: [] } },
            },
            result: {
              data: {
                listCompanies: {
                  edges: [
                    {
                      node: {
                        id: 'id',
                        city: 'city',
                        name: 'name',
                        speciality: 'PLUMBING',
                        logo: { url: 'url' },
                      },
                      cursor: 'id',
                    },
                  ],
                  pageInfo: {
                    totalCount: 10,
                    hasNextPage: 0,
                    hasPreviousPage: 0,
                  },
                },
              },
            },
          },
          {
            request: {
              query: LIST_COMPANIES,
              variables: { filter: { name: null, speciality: ['PLUMBING'] } },
            },
            result: {
              data: {
                listCompanies: {
                  edges: [],
                  pageInfo: {
                    totalCount: 10,
                    hasNextPage: 0,
                    hasPreviousPage: 0,
                  },
                },
              },
            },
          },
        ]}>
        <App timeout={0} />
      </MockedProvider>
    );
    await wait(0);
    expect(tree.root.findAllByType(PlaceholderList)).toHaveLength(0);
    expect(
      tree.root.findByType(Container).findAllByType('p')[0].props.children
    ).toContain('Showing first 1 of 10');
    act(() => {
      tree.root
        .findByType(List)
        .findByType(ListItem)
        .findByType(Tags)
        .findAllByType(Tag)[1]
        .props.onClick();
    });
    await wait(0);
    expect(
      tree.root.findByType(Container).findAllByType('p')[0].props.children
    ).toContain('Showing first 0 of 10');
    expect(tree.root.findAllByType(PlaceholderList)).toHaveLength(0);
    expect(tree.root.findAllByType(ListItem)).toHaveLength(0);
  });
  it('should apply text filter', async () => {
    const tree = renderer.create(
      <MockedProvider
        addTypename={false}
        mocks={[
          {
            request: {
              query: LIST_COMPANIES,
              variables: { filter: { name: null, speciality: [] } },
            },
            result: {
              data: {
                listCompanies: {
                  edges: [
                    {
                      node: {
                        id: 'id',
                        city: 'city',
                        name: 'name',
                        speciality: 'PLUMBING',
                        logo: { url: 'url' },
                      },
                      cursor: 'id',
                    },
                  ],
                  pageInfo: {
                    totalCount: 10,
                    hasNextPage: 0,
                    hasPreviousPage: 0,
                  },
                },
              },
            },
          },
          {
            request: {
              query: LIST_COMPANIES,
              variables: { filter: { name: 'Test', speciality: [] } },
            },
            result: {
              data: {
                listCompanies: {
                  edges: [],
                  pageInfo: {
                    totalCount: 10,
                    hasNextPage: 0,
                    hasPreviousPage: 0,
                  },
                },
              },
            },
          },
        ]}>
        <App timeout={0} />
      </MockedProvider>
    );
    await wait(0);
    expect(tree.root.findAllByType(PlaceholderList)).toHaveLength(0);
    expect(
      tree.root.findByType(Container).findAllByType('p')[0].props.children
    ).toContain('Showing first 1 of 10');
    act(() => {
      tree.root
        .findByType(Form)
        .findByType('input')
        .props.onChange({ currentTarget: { value: 'Test' } });
    });
    await wait(0);
    expect(
      tree.root.findByType(Container).findAllByType('p')[0].props.children
    ).toContain('Showing first 0 of 10');
    expect(tree.root.findAllByType(PlaceholderList)).toHaveLength(0);
    expect(tree.root.findAllByType(ListItem)).toHaveLength(0);
  });
});
