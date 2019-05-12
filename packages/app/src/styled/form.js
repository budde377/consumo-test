import styled from 'styled-components'
import { Tags } from './tags'

export const Form = styled.form`
  input {
    width: 100%;
    font-size: 1em;
    padding: 0.5em;
    box-sizing: border-box;
  }
  ${Tags} {
    margin-top: 1em;
    font-size: 0.9em;
  }
  padding-bottom: 1em;

`
