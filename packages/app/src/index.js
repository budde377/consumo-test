import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL || 'https://api.consuno.budde377.io'
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),)
