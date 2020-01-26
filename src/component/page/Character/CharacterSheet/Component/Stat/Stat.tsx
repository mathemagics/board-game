import * as React from 'react';

import {Container, Name, Multiplier} from './Stat.style';

interface StatProps {
  name: string,
  value: number,
}

export default ({name, value}: StatProps) => {
  const prefix = value > 0 ? '+' : '';

  return (
    <Container>
      <Name>
        {name}
      </Name>
      <Multiplier>
        {`${prefix}${value}`}
      </Multiplier>
    </Container>
  );
};
