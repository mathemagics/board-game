import * as React from 'react';
import {Input, Select} from '@rocketseat/unform';
import {useMutation} from '@apollo/react-hooks';

import {UPDATE_SPECIES, UPDATE_NAME, UPDATE_PLAYBOOK} from './mutation';

import {OptionType} from './type';

// TODO put initial values types somewhere useful
interface CharacterBasicProps {
  initialValues: {
    species: OptionType[]
    playbooks: OptionType[]
  }
}

export default ({
  initialValues: {species: speciesOptions, playbooks: playbookOptions},
}: CharacterBasicProps) => {
  // TODO: Handle mutation updates. probably optimistically.
  const [speciesMutation, {data: _speciesData}] = useMutation(UPDATE_SPECIES);
  const [nameMutation, {data: _nameData}] = useMutation(UPDATE_NAME);
  const [playbookMutation, {data: _playbookData}] = useMutation(UPDATE_PLAYBOOK);

  const updateSpecies = (species: string) => {
    speciesMutation({variables: {species}});
  };

  const updateName = (name: string) => {
    nameMutation({variables: {name}});
  };

  const updatePlaybook = (playbook: string) => {
    playbookMutation({variables: {playbook}});
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
      <div>
        <div>playbook</div>
        <Select
          name="playbook"
          options={playbookOptions}
          onBlur={
            (e: React.FormEvent<HTMLSelectElement>) => (
              updatePlaybook((e.target as HTMLSelectElement).value)
            )
          }
        />
      </div>
    </>
  );
};
