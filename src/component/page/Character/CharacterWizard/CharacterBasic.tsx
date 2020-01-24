import * as React from 'react';
import {Input, Select} from '@rocketseat/unform';
import {useMutation} from '@apollo/react-hooks';

import {UPDATE_SPECIES, UPDATE_NAME} from './mutation';

// TODO put initial values types somewhere useful
interface CharacterBasicProps {
  initialValues: {
    species: {id: string, title: string}[]
  }
}

export default ({initialValues: {species: speciesOptions}}: CharacterBasicProps) => {
  // TODO: Handle mutation updates. probably optimistically.
  const [speciesMutation, {data: _speciesData}] = useMutation(UPDATE_SPECIES);
  const [nameMutation, {data: _nameData}] = useMutation(UPDATE_NAME);
  const updateSpecies = (species: string) => {
    speciesMutation({variables: {species}});
  };

  const updateName = (name: string) => {
    nameMutation({variables: {name}});
  };

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
        <Select
          name="species"
          options={speciesOptions}
          onBlur={
            (e: React.FormEvent<HTMLSelectElement>) => (
              updateSpecies((e.target as HTMLSelectElement).value)
            )
          }
        />
      </div>
    </>
  );
};
