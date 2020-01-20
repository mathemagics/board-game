import * as React from 'react';
import {Form, Input} from '@rocketseat/unform';
import {useMutation} from '@apollo/react-hooks';

import {UPDATE_SPECIES, UPDATE_NAME} from './query';

export default () => {
  const [speciesMutation, {data: speciesData}] = useMutation(UPDATE_SPECIES);
  const [nameMutation, {data: nameData}] = useMutation(UPDATE_NAME);

  const updateSpecies = (species: string) => {
    speciesMutation({variables: {species}});
  };

  const updateName = (name: string) => {
    nameMutation({variables: {name}});
  };

  console.log('species', speciesData);
  console.log('name', nameData);

  return (
    <Form onSubmit={() => {}}>
      <div>
        <div>name</div>
        <Input
          name="name"
          onBlur={
            (e: React.FormEvent<HTMLInputElement>) => (
              updateName((e.target as HTMLInputElement).value)
            )
          }
        />
      </div>
      <div>
        <div>species</div>
        <Input
          name="species"
          onBlur={
            (e: React.FormEvent<HTMLInputElement>) => (
              updateSpecies((e.target as HTMLInputElement).value)
            )
          }
        />
      </div>
    </Form>
  );
};
