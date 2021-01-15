import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Card, CardGroup, DnDFrame, Label, SpacedContent} from 'component/base';

import {Card as CardType} from 'game/card';

import {BanPile} from '../BanPile';
import {DiscardPile} from '../DiscardPile';
import {PoolPile} from '../PoolPile';
import {ReactionPile} from '../ReactionPile';

import {
  selectActiveGame,
  selectEnemyPlayer,
  selectMyPlayer,
} from '../../Game/GameDuck';

import {
  addToReaction,
  banFromHand,
  banFromPool,
  cycleFromHand,
  cycleFromPool,
  discardFromHand,
  drawFromDeck,
  drawFromDiscard,
  removeFromReaction,
  swapHandAndPool,
} from '../../Game/CardDuck';

export const Cards = () => {
  const dispatch = useDispatch();

  const game = useSelector(selectActiveGame);
  const {deck, discard, pool, banned} = game;

  const myPlayer = useSelector(selectMyPlayer);
  const {hand, reaction} = myPlayer;

  const enemy = useSelector(selectEnemyPlayer);
  const opponentHand = enemy.hand;
  const opponentReaction = enemy.reaction;

  // TODO move the card code into game/card move actions into actions file
  const handleBan = ({suit, from}: {suit: CardType; from: string}) => {
    if (from === 'pool') {
      dispatch(banFromPool(suit));
    } else if (from === 'hand') {
      dispatch(banFromHand(suit));
    }
  };

  const handleDiscard = (card: CardType) => {
    dispatch(discardFromHand(card));
  };

  const handleDraw = () => {
    dispatch(drawFromDeck());
  };

  const handleHandClick = (card: CardType) => {
    dispatch(cycleFromHand(card));
  };

  const handlePoolDraw = (card: CardType) => {
    dispatch(cycleFromPool(card));
  };

  const handlePoolDrop = (
    {suit: handCard}: {suit: CardType},
    poolCard: CardType
  ) => {
    dispatch(swapHandAndPool({handCard, poolCard}));
  };

  const handleReactionDrop = (card: CardType) => {
    dispatch(addToReaction(card));
  };

  const handleReactionRemove = (card: CardType) => {
    dispatch(removeFromReaction(card));
  };

  const handleTakeDiscard = () => {
    dispatch(drawFromDiscard());
  };

  return (
    <DnDFrame style={{width: 675, height: 230}}>
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
        </SpacedContent>
        <SpacedContent horizontal space={3}>
          <SpacedContent horizontal space={1} center>
            <Label>Enemy Hand:</Label>
            <Card>{opponentHand.length}</Card>
          </SpacedContent>
          <SpacedContent horizontal space={1} center>
            <Label>Enemy Reaction:</Label>
            <Card>{opponentReaction.length}</Card>
          </SpacedContent>
        </SpacedContent>
        <SpacedContent grow horizontal space={2}>
          <CardGroup
            name="hand"
            label="Action:"
            cards={hand}
            isSorted
            onCardDoubleClick={handleHandClick}
          />
        </SpacedContent>
        <SpacedContent grow horizontal space={2}>
          <ReactionPile
            onDrop={handleReactionDrop}
            onCardDoubleClick={handleReactionRemove}
            reaction={reaction}
          />
        </SpacedContent>
      </SpacedContent>
    </DnDFrame>
  );
};
