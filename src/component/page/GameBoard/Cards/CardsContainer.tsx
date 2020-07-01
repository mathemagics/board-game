import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {drawCard, discardCard, shuffle} from 'game/card';

import {Card, CardGroup, DnDFrame, Label, SpacedContent} from 'component/base';

import {BanPile} from '../BanPile';
import {DiscardPile} from '../DiscardPile';
import {PoolPile} from '../PoolPile';

import {
  selectActiveGame,
  selectEnemyPlayer,
  selectMyID,
  selectMyPlayer,
} from '../../Game/GameDuck';

const PLAYER_ONE = 'player1';
const PLAYER_TWO = 'player2';

export const Cards = () => {
  const dispatch = useDispatch();

  const uid = useSelector(selectMyID);

  const game = useSelector(selectActiveGame);
  const {deck, discard, player1, pool, banned} = game;

  const isPlayer1 = player1.uid === uid;
  const myPlayer = useSelector(selectMyPlayer);
  const myPlayerKey = isPlayer1 ? PLAYER_ONE : PLAYER_TWO;
  const enemy = useSelector(selectEnemyPlayer);
  const {hand} = myPlayer;
  const opponentHand = enemy.hand;

  // TODO move the card code into game/card move actions into actions file
  const handleBan = ({suit, from}) => {
    // TODO: Dedupe
    if (from === 'pool') {
      const remainingPool = pool.filter((_item, index) => {
        return pool.indexOf(suit) !== index;
      });
      const newPool = banned ? [...remainingPool, banned] : remainingPool;

      dispatch(
        updateGame({
          banned: suit,
          pool: newPool,
        })
      );
    } else if (from === 'hand') {
      const remainingHand = hand.filter((_item, index) => {
        return hand.indexOf(suit) !== index;
      });
      const newHand = banned ? [...remainingHand, banned] : remainingHand;

      dispatch(
        updateGame({
          banned: suit,
          [`${myPlayerKey}.hand`]: newHand,
        })
      );
    }
  };

  const handleDiscard = card => {
    const [discardedHand, newDiscard] = discardCard({card, hand, discard});

    dispatch(
      updateGame({
        discard: newDiscard,
        [`${myPlayerKey}.hand`]: discardedHand,
      })
    );
  };

  const handleHandClick = card => {
    const isDeckEmpty = deck.length === 0;
    const drawDeck = isDeckEmpty ? shuffle([...discard]) : deck;
    const newDiscard = isDeckEmpty ? [card] : [...discard, card];
    const [newCard, newDeck] = drawCard(drawDeck);
    const remainingHand = hand.filter((_item, index) => {
      return hand.indexOf(card) !== index;
    });
    const newHand = [...remainingHand, newCard];

    dispatch(
      updateGame({
        discard: newDiscard,
        deck: newDeck,
        [`${myPlayerKey}.hand`]: newHand,
      })
    );
  };

  const handleDraw = () => {
    const isDeckEmpty = deck.length === 0;
    const drawDeck = isDeckEmpty ? shuffle([...discard]) : deck;
    const [card, newDeck] = drawCard(drawDeck);
    const newHand = [...hand, card];
    const newDiscard = isDeckEmpty ? [] : discard;

    dispatch(
      updateGame({
        discard: newDiscard,
        deck: newDeck,
        [`${myPlayerKey}.hand`]: newHand,
      })
    );
  };

  const handlePoolDraw = poolCard => {
    const activeDeck = deck.length === 0 ? shuffle([...discard]) : deck;
    const newDiscard = deck.length === 0 ? [poolCard] : [...discard, poolCard];
    const index = pool.indexOf(poolCard);
    const [card, newDeck] = drawCard(activeDeck);
    const newPool = [...pool];
    newPool[index] = card;

    dispatch(
      updateGame({
        deck: newDeck,
        discard: newDiscard,
        pool: newPool,
      })
    );
  };

  const handlePoolDrop = ({suit}, poolCard) => {
    const poolIndex = pool.indexOf(poolCard);
    const newPool = [...pool];
    newPool[poolIndex] = suit;

    const handIndex = hand.indexOf(suit);
    const newHand = [...hand];
    newHand[handIndex] = poolCard;

    dispatch(
      updateGame({
        [`${myPlayerKey}.hand`]: newHand,
        pool: newPool,
      })
    );
  };

  const handleTakeDiscard = () => {
    if (discard.length < 1) {
      return;
    }

    const newHand = [...hand, discard[discard.length - 1]];
    const newDiscard = discard.slice(0, discard.length - 1);
    dispatch(
      updateGame({[`${myPlayerKey}.hand`]: newHand, discard: newDiscard})
    );
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
