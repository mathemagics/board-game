import * as React from 'react';
import {useHistory} from 'react-router-dom';
import {useMutation} from '@apollo/react-hooks';

import {CREATE_CHARACTER} from '../mutation';


export default () => {
  const history = useHistory();

  const [createCharacterMutation, _data] = useMutation(CREATE_CHARACTER);

  const handleClick = (page: string) => {
    createCharacterMutation()
    .then((response) => {
      const characterID = response.data.createCharacter.id
      history.push(`/character/${page}/${characterID}`, {characterID})
    })
  }

  return (
    <div>
      <button type="button">Standard</button>
      <button type="button" onClick={() => {handleClick('quickstart')}}>
        Quickstart
      </button>
      <button type="button">Random</button>
    </div>
  );
};
