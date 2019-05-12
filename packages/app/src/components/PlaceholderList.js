import {
  Description,
  List,
  ListItem,
  Placeholder,
  Tags,
  Thumb,
} from '../styled';
import React from 'react';

export default () => (
  <List>
    <ListItem>
      <Thumb />
      <Description>
        <Placeholder />
      </Description>
      <Tags />
    </ListItem>
    <ListItem>
      <Thumb />
      <Description>
        <Placeholder />
      </Description>
      <Tags />
    </ListItem>
    <ListItem>
      <Thumb />
      <Description>
        <Placeholder />
      </Description>
      <Tags />
    </ListItem>
  </List>
);
