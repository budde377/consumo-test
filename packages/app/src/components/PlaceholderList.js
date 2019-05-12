import { Description, List, ListItem, Placeholder, Thumb } from '../styled';
import React from 'react';

export default () => (
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
);
