import * as React from 'react';
import {Input, Select} from '@rocketseat/unform';
import {useMutation} from '@apollo/react-hooks';

import {UPDATE_SPECIES, UPDATE_NAME} from './mutation';

// TODO: Query species.
const speciesOptions = [
  {id: 'raccoon', title: 'Raccoon'},
  {id: 'bird', title: 'Bird'},
  {id: 'badger', title: 'Badger'},
];


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
    <>
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
      <div>
        <Select name="playbook" options={speciesOptions} />
      </div>
    </>
  );
};
