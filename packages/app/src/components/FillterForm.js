import { Drop, Excavator, Form, Lightning, Tag, Tags } from '../styled';
import React from 'react';

const SearchBar = ({ onChange, value }) => {
  return (
    <label>
      <input placeholder={'Name'} value={value} onChange={onChange} />
    </label>
  );
};
const CheckboxTag = ({ children, filter, onChange, color, name }) => {
  const active = filter.indexOf(name) >= 0;
  return (
    <Tag
      color={active ? color : undefined}
      onClick={() =>
        onChange(active ? filter.filter(v => v !== name) : [...filter, name])
      }>
      {children}
    </Tag>
  );
};
export default ({ onChange, filter }) => {
  const changeSpecialty = speciality => onChange({ ...filter, speciality });
  return (
    <Form onSubmit={evt => evt.preventDefault()}>
      <SearchBar
        value={filter.name || ''}
        onChange={e => {
          onChange({ ...filter, name: e.currentTarget.value || null });
        }}
      />
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
  );
};
