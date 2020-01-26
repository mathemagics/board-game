import * as React from 'react';

import {Container, Name, Multiplier} from './Stat.style';

interface StatProps {
  name: string,
  value: string,
}

export default ({name, value}: StatProps) => (
  <Container>
    <Name>{name}</Name>
    <Multiplier>{value}</Multiplier>
  </Container>
);
