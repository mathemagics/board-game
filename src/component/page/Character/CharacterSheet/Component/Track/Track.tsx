import * as React from 'react';

import {
  Container, Name, BoxContainer, Box,
} from './Track.style';

interface TrackProps {
  name: string,
  count: number
}

export default ({name, count}: TrackProps) => {
  const countArray = [...Array(count)];
  return (
    <Container>
      <Name>{name}</Name>
      <BoxContainer>
        {countArray.map((_val, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={index} />
        ))}
      </BoxContainer>
    </Container>
  );
};
