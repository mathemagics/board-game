import * as React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';

import Stat from './Component/Stat';
import Track from './Component/Track';

import {
  Name, Header, StatsContainer, TracksContainer,
} from './CharacterSheet.style';

import {GET_CHARACTER} from '../query';

const STATS = [
  {name: 'Charm', value: -2},
  {name: 'Cunning', value: 1},
  {name: 'Finesse', value: 0},
  {name: 'Luck', value: 0},
  {name: 'Might', value: 2},
];

const NAME = "Pouch";
const PLAYBOOK = "Arbiter";

const TRACKS = [
  {name: 'injury', count: 4},
  {name: 'exhaustion', count: 4},
  {name: 'decay', count: 4},
];

export default () => {
  const {charID: characterId} = useParams();

  const {
    loading: characterLoading,
    data: _characterData,
  } = useQuery(GET_CHARACTER, {variables: {id: characterId}});

  return characterLoading ? null : (
    <Header>
      <div>
        <Name>{`${NAME}, the ${PLAYBOOK}`}</Name>
        <StatsContainer>
          {STATS.map(({name, value}) => <Stat key={name} name={name} value={value} />)}
        </StatsContainer>
      </div>
      <div>
        <TracksContainer>
          {TRACKS.map(({name, count}) => <Track key={name} name={name} count={count} />)}
        </TracksContainer>
      </div>
    </Header>
  );
};
