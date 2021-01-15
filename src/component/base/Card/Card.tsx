import * as React from 'react';
import {
  GiArrowDunk,
  GiClubs,
  GiCrownedSkull,
  GiCutDiamond,
  GiHeartBeats,
  GiSpadeSkull,
} from 'react-icons/gi';

import {Card as CardType} from 'game/card';

import {Container} from './Card.style';

interface CardProps {
  children?: React.ReactNode;
  suit?: CardType | 'plus';
}

export const Card = React.forwardRef<HTMLButtonElement, CardProps>(
  ({children, suit, ...rest}, ref) => {
    let Icon;
    let color;
    // TODO dedupe this with ability costs
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
  }
);
