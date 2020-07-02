import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Card, CardGroup, DnDFrame, Label, SpacedContent} from 'component/base';

import {BanPile} from '../BanPile';
import {DiscardPile} from '../DiscardPile';
import {PoolPile} from '../PoolPile';

import {
  selectActiveGame,
  selectEnemyPlayer,
  selectMyPlayer,
} from '../../Game/GameDuck';

import {
  banFromHand,
  banFromPool,
  cycleFromHand,
  cycleFromPool,
  discardFromHand,
  drawFromDeck,
  drawFromDiscard,
  swapHandAndPool,
} from '../../Game/CardDuck';

export const Cards = () => {
  const dispatch = useDispatch();

  const game = useSelector(selectActiveGame);
  const {deck, discard, pool, banned} = game;

  const myPlayer = useSelector(selectMyPlayer);
  const {hand} = myPlayer;

  const enemy = useSelector(selectEnemyPlayer);
  const opponentHand = enemy.hand;

  // TODO move the card code into game/card move actions into actions file
  const handleBan = ({suit, from}) => {
    if (from === 'pool') {
      dispatch(banFromPool(suit));
    } else if (from === 'hand') {
      dispatch(banFromHand(suit));
    }
  };

  const handleDiscard = card => {
    dispatch(discardFromHand(card));
  };

  const handleHandClick = card => {
    dispatch(cycleFromHand(card));
  };

  const handleDraw = () => {
    dispatch(drawFromDeck());
  };

  const handlePoolDraw = card => {
    dispatch(cycleFromPool(card));
  };

  const handlePoolDrop = ({suit: handCard}, poolCard) => {
    dispatch(swapHandAndPool({handCard, poolCard}));
  };

  const handleTakeDiscard = () => {
    dispatch(drawFromDiscard());
  };

  return (
    <DnDFrame style={{width: '100%', height: 120}}>
      <SpacedContent header={2}>
        <SpacedContent horizontal space={3}>
          <SpacedContent horizontal space={1} center>
            <Label>Deck:</Label>
            <Card onDoubleClick={handleDraw}>{deck.length}</Card>
          </SpacedContent>
          <PoolPile
            onDrop={handlePoolDrop}
            onCardDoubleClick={handlePoolDraw}
            pool={pool}
          />
          <DiscardPile
            card={discard[discard.length - 1]}
            onDrop={handleDiscard}
            onCardDoubleClick={handleTakeDiscard}
          />
          <BanPile card={banned} onDrop={handleBan} />
          <SpacedContent horizontal space={1} center>
            <Label>Enemy:</Label>
            <Card>{opponentHand.length}</Card>
          </SpacedContent>
        </SpacedContent>
        <SpacedContent horizontal space={2}>
          <CardGroup
            name="hand"
            label="Hand:"
            cards={hand}
            isSorted
            onCardDoubleClick={handleHandClick}
          />
        </SpacedContent>
      </SpacedContent>
    </DnDFrame>
  );
};
