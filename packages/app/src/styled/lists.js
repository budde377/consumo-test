import styled from 'styled-components'
import { Tags } from './tags'

export const Thumb = styled.div.attrs(({url}) => ({style: {backgroundImage: `url(${url})`}}))`
  background-position: center center;
  background-size: cover;
  display: inline-block;
  background-color: #dfdfdf;
`
export const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 0 0.5em #aaa;
`
export const Description = styled.div`
  padding: 0 0.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
export const ListItem = styled.li`
  height: 3em;
  border-bottom: 0.01em solid #cfcfcf;
  padding: 0.5em;
  display: flex;
  align-items: center;
  ${Thumb} {
    height: 3em;
    width: 3em;
    flex: 0 0 3em;
  }
  ${Description} {
    flex: 1 1;
  }
  ${Tags} {
    font-size: 0.8em;
  }
  @media(max-width: 40em) {
    flex-wrap: wrap;
    height: auto;
    ${Tags} {
      width: 100%;
      padding: 1em 0;
      align-content: center;
    }    
  }

`
