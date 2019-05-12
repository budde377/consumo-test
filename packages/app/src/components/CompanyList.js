import {
  Description,
  Drop,
  Excavator,
  House,
  Lightning,
  List,
  ListItem,
  Tag,
  Tags,
  Thumb,
} from '../styled';
import React from 'react';

const SpecialtyTag = ({ specialty, onClick }) => {
  switch (specialty) {
    case 'EXCAVATION':
      return (
        <Tag onClick={onClick} color={'orange'}>
          <Excavator />
          Excavation
        </Tag>
      );
    case 'ELECTRICAL':
      return (
        <Tag onClick={onClick} color={'blue'}>
          <Lightning />
          Electrical
        </Tag>
      );
    case 'PLUMBING':
      return (
        <Tag onClick={onClick} color={'green'}>
          <Drop />
          Plumbing
        </Tag>
      );
    default:
      return null;
  }
};
export default ({ edges, onTagClick }) => (
  <List>
    {edges.map(c => (
      <ListItem key={c.node.id}>
        <Thumb url={c.node.logo.url} />
        <Description>{c.node.name}</Description>
        <Tags>
          <Tag>
            <House />
            {c.node.city}
          </Tag>
          <SpecialtyTag
            specialty={c.node.speciality}
            onClick={() => onTagClick(c.node.speciality)}
          />
        </Tags>
      </ListItem>
    ))}
  </List>
);
