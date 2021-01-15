import * as React from 'react';

import {Hexagon, Text} from 'react-hexgrid';
import {Map} from './KillZone.style';

interface KillZoneProps {
  onDrop: () => void;
}

// TODO this does not work as intended
export const KillZone: React.FC<KillZoneProps> = ({onDrop}) => {
  const onDragStart = event => event.preventDefault();
  const onDragOver = event => event.preventDefault();

  return (
    <Map size={{x: 5.5, y: 5.5}} flat={false} origin={{x: 12, y: 35}}>
      <Hexagon
        q={0}
        r={0}
        s={0}
        onDrop={onDrop}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
      >
        <Text>Kill</Text>
      </Hexagon>
    </Map>
  );
};
