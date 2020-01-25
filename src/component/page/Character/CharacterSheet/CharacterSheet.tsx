import * as React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';

import {GET_CHARACTER} from '../query';

export default () => {
  const {charID: characterId} = useParams();

  const {
    loading: characterLoading,
    data: _characterData,
  } = useQuery(GET_CHARACTER, {variables: {id: characterId}});

  return characterLoading ? <div>CharacterSheet</div> : null;
};
