import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import GlobalStyle, { Container } from './../styled'
import {
  Placeholder,
  Alert,
  Drop,
  Excavator,
  House,
  Lightning,
  Message,
  Description, List, ListItem, Thumb,
  Tag, Tags,
  Form
} from '../styled'
import { useThrottle } from '../hooks'

const LIST_COMPANIES = gql`
  query ($filter: CompanyFilter) {
    listCompanies(first: 50 filter: $filter) {
      edges {
        node {
          id
          name
          speciality
          city
          logo {url}
        }
        cursor
      }
      pageInfo {
        totalCount
      }
    }
  }
`

const SpecialtyTag = ({specialty, onClick}) => {
  switch (specialty) {
    case 'EXCAVATION':
      return <Tag onClick={onClick} color={'orange'}><Excavator /> Excavation</Tag>
    case 'ELECTRICAL':
      return <Tag onClick={onClick} color={'blue'}><Lightning /> Electrical</Tag>
    case 'PLUMBING':
      return <Tag onClick={onClick} color={'green'}><Drop /> Plumbing</Tag>
    default:
      return null
  }
}

const PlaceholderList = () => (
  <List>
    <ListItem>
      <Thumb />
      <Description>
        <Placeholder />
      </Description>
    </ListItem>
    <ListItem>
      <Thumb />
      <Description>
        <Placeholder />
      </Description>
    </ListItem>
    <ListItem>
      <Thumb />
      <Description>
        <Placeholder />
      </Description>
    </ListItem>
  </List>
)

const CompanyList = ({edges, onTagClick}) => (
  <List>
    {edges.map(c => (
      <ListItem key={c.node.id}>
        <Thumb url={c.node.logo.url} />
        <Description>
          {c.node.name}
        </Description>
        <Tags>
          <Tag>
            <House />
            {c.node.city}
          </Tag>
          <SpecialtyTag specialty={c.node.speciality} onClick={() => onTagClick(c.node.speciality)} />
        </Tags>
      </ListItem>
    ))}
  </List>
)

const SearchBar = ({onChange, value}) => {
  return (
    <label>
      <input placeholder={'Name'} value={value} onChange={onChange} />
    </label>
  )
}

const CheckboxTag = ({children, filter, onChange, color, name}) => {
  const active = filter.indexOf(name) >= 0
  return (
    <Tag
      color={active ? color : undefined}
      onClick={() => onChange(active ? filter.filter(v => v !== name) : [...filter, name])}>
      {children}
    </Tag>
  )
}

const FilterForm = ({onChange, filter}) => {
  const changeSpecialty = speciality => onChange({...filter, speciality})
  return (
    <Form onSubmit={(evt) => evt.preventDefault()}>
      <SearchBar value={filter.name || ''} onChange={e => {
        onChange({...filter, name: e.currentTarget.value || null})
      }} />
      <Tags>
        <CheckboxTag
          filter={filter.speciality || []}
          color={'orange'}
          name={'EXCAVATION'}
          onChange={changeSpecialty}>
          <Excavator /> Excavation
        </CheckboxTag>
        <CheckboxTag
          filter={filter.speciality || []}
          color={'blue'}
          name={'ELECTRICAL'}
          onChange={changeSpecialty}>
          <Lightning /> Electrical
        </CheckboxTag>
        <CheckboxTag
          filter={filter.speciality || []}
          color={'green'}
          name={'PLUMBING'}
          onChange={changeSpecialty}>
          <Drop /> Plumbing
        </CheckboxTag>
      </Tags>
    </Form>
  )
}

function App () {
  const [filter, variables, update] = useThrottle({name: null, speciality: []}, 500) // Use timeout for better UX
  return (
    <>
      <GlobalStyle />
      <Container>
        <Query query={LIST_COMPANIES} variables={{filter: variables}}>
          {({data, loading, error}) => {
            const edges = (data && data.listCompanies && data.listCompanies.edges) || []
            const pageInfo = data && data.listCompanies && data.listCompanies.pageInfo
            const l = loading || filter !== variables
            return (
              <>
                <h1>
                  Companies
                </h1>
                <FilterForm filter={filter} onChange={update} />
                {error && <Message><Alert />{error.message}</Message>}
                <p>
                  {l
                    ? <Placeholder />
                    : `Showing first ${edges.length} of ${pageInfo ? pageInfo.totalCount : 0}`}
                </p>
                {l
                  ? <PlaceholderList />
                  : <CompanyList edges={edges} onTagClick={type => update({...filter, speciality: [type]})} />}
              </>
            )
          }}
        </Query>
      </Container>
    </>
  )
}

export default App
