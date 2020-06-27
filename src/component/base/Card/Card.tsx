import * as React from 'react';
import {
  GiArrowDunk,
  GiHeartBeats,
  GiCutDiamond,
  GiSpadeSkull,
  GiClubs,
  GiCrownedSkull,
} from 'react-icons/gi';

import {Container} from './Card.style';

export const Card = React.forwardRef(({children, suit, ...rest}, ref) => {
  let Icon;
  let color;
  switch (suit) {
    case 'diamond':
      Icon = GiCutDiamond;
      color = 'blue';
      break;

    case 'heart':
      Icon = GiHeartBeats;
      color = 'red';
      break;

    case 'spade':
      Icon = GiSpadeSkull;
      color = 'black';
      break;

    case 'face':
      Icon = GiCrownedSkull;
      color = 'orange';
      break;

    case 'club':
      Icon = GiClubs;
      color = 'green';
      break;

    case 'plus':
      Icon = GiArrowDunk;
      color = 'black';
      break;

    default:
      break;
  }
  return (
    <Container ref={ref} {...rest}>
      {Icon && <Icon color={color} />}
      {children}
    </Container>
  );
});
