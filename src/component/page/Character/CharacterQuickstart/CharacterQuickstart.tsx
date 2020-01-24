import * as React from 'react';
import {Form} from '@rocketseat/unform';
import {useParams} from 'react-router-dom';
import {useQuery, useMutation} from '@apollo/react-hooks';

import Wizard from 'component/base/Wizard';

import {GET_CHARACTER, GET_SPECIES, GET_PLAYBOOKS} from '../query';

import pages from './pages';

import {SpeciesType, PlaybookType} from '../type';

export default () => {
  // TODO: Handle errors.
  // TODO: Look into batching this

  const {charID: characterId} = useParams();
  const {
    loading: characterLoading,
    data: characterData,
  } = useQuery(GET_CHARACTER, {variables: {id: characterId}});
  const {
    loading: speciesLoading,
    data: speciesData,
  } = useQuery(GET_SPECIES);

  const speciesOptions = speciesData && speciesData.listSpecies.map(
    ({name}: SpeciesType) => ({id: name, title: name}),
  );

  const {
    loading: playbookLoading,
    data: playbookData,
  } = useQuery(GET_PLAYBOOKS);

  const playbookOptions = playbookData && playbookData.listPlaybooks.map(
    ({id, name}: PlaybookType) => ({id, title: name}),
  );

  const loading = speciesLoading || playbookLoading;

  // TODO: handle building initialValues in separate file
  const initialValues = {species: speciesOptions, playbooks: playbookOptions};


  return (
    <Form onSubmit={() => {}}>
      {!loading && <Wizard pages={pages} childProps={{initialValues}} />}
    </Form>
  );
};
