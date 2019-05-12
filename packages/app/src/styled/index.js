import styled, { createGlobalStyle } from 'styled-components';
import 'typeface-open-sans';
import 'typeface-roboto';
import 'typeface-roboto-condensed';
import { Icon } from './icons';

export * from './icons';
export * from './lists';
export * from './form';
export * from './tags';

export const Message = styled.div`
  border: 0.1em solid indianred;
  color: indianred;
  line-height: 2em;
  padding: 1em;
  ${Icon} {
    fill: indianred;
    height: 2em;
    width: 2em;
    display: inline-block;
    vertical-align: middle;
    margin-right: 1em;
  }
`;

export const Placeholder = styled.span`
  width: 90%;
  height: 1em;
  background-color: #dfdfdf;
  display: inline-block;
`;

export const Container = styled.div`
  padding: 1em;
`;

export default createGlobalStyle`
  body {
    min-width: 20em;
    margin: 0;
    padding: 0;
    font-family: "Open Sans", sans-serif;
  }
  h1 {
    font-family: "Roboto", sans-serif;
  }
`;
