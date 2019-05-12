import styled from 'styled-components';
import { colors } from './colors';
import { Icon } from './icons';

export const Tag = styled.li`
  background-color: ${({ color }) =>
    color ? colors[color] : 'rgb(145,145,145)'};
  border-radius: 0.3em;
  padding: 0.2em 1em;
  color: #fff;
  margin: 0.5em;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'inherit')};
  user-select: ${({ onClick }) => (onClick ? 'none' : 'inherit')};
  ${Icon} {
    fill: #fff;
    height: 1em;
    width: 1em;
    margin-right: 0.5em;
  }
`;
export const Tags = styled.ul`
  list-style-type: none;
  display: flex;
  min-height: 1.4em;
  margin: -0.5em;
  padding: 0;
  flex-wrap: wrap;
  align-items: center;
  font-family: 'Roboto Condensed', sans-serif;
`;
