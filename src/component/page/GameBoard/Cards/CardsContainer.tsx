import * as React from 'react';
import {useSelector} from 'react-redux';

import {drawCard, discardCard, shuffle} from 'game/card';

import {
  Card,
  CardGroup,
  DnDFrame,
  Label,
  SpacedContent,
  Spinner,
} from 'component/base';

import {BanPile} from '../BanPile';
import {DiscardPile} from '../DiscardPile';
import {PoolPile} from '../PoolPile';

// TODO don't get updateGame from props
export const Cards = ({updateGame}: {deck: [string]}) => {
  const {gameID, uid} = useSelector(({game, firebase}) => ({
    gameID: game.activeGame,
    uid: firebase.auth.uid,
  }));

  const {deck, discard, player1, player2, pool, banned} = useSelector(
    ({firestore: {data}}) => data.games && data.games[gameID]
  );

  const myPlayer = player1.uid === uid ? 'player1' : 'player2';

  const opponentHand = rest && rest.hand;

  const handleBan = ({suit, from}) => {
    // TODO: Dedupe
    if (from === 'pool') {
      const remainingPool = pool.filter((_item, index) => {
        return pool.indexOf(suit) !== index;
      });
      const newPool = banned ? [...remainingPool, banned] : remainingPool;

      updateGame({
        banned: suit,
        pool: newPool,
      });
    } else if (from === 'hand') {
      const remainingHand = hand.filter((_item, index) => {
        return hand.indexOf(suit) !== index;
      });
      const newHand = banned ? [...remainingHand, banned] : remainingHand;

      updateGame({
        banned: suit,
        [`${myPlayer}.hand`]: newHand,
      });
    }
  };

  const handleDiscard = card => {
    const [discardedHand, newDiscard] = discardCard({card, hand, discard});

    updateGame({
      discard: newDiscard,
      [`${myPlayer}.hand`]: discardedHand,
    });
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

    updateGame({
      discard: newDiscard,
      deck: newDeck,
      [`${myPlayer}.hand`]: newHand,
    });
  };

  const handleDraw = () => {
    const isDeckEmpty = deck.length === 0;
    const drawDeck = isDeckEmpty ? shuffle([...discard]) : deck;
    const [card, newDeck] = drawCard(drawDeck);
    const newHand = [...hand, card];
    const newDiscard = isDeckEmpty ? [] : discard;

    updateGame({
      discard: newDiscard,
      deck: newDeck,
      [`${myPlayer}.hand`]: newHand,
    });
  };

  const handlePoolDraw = poolCard => {
    const activeDeck = deck.length === 0 ? shuffle([...discard]) : deck;
    const newDiscard = deck.length === 0 ? [poolCard] : [...discard, poolCard];
    const index = pool.indexOf(poolCard);
    const [card, newDeck] = drawCard(activeDeck);
    const newPool = [...pool];
    newPool[index] = card;

    updateGame({
      deck: newDeck,
      discard: newDiscard,
      pool: newPool,
    });
  };

  const handlePoolDrop = ({suit}, poolCard) => {
    const poolIndex = pool.indexOf(poolCard);
    const newPool = [...pool];
    newPool[poolIndex] = suit;

    const handIndex = hand.indexOf(suit);
    const newHand = [...hand];
    newHand[handIndex] = poolCard;

    updateGame({
      [`${myPlayer}.hand`]: newHand,
      pool: newPool,
    });
  };

  const handleTakeDiscard = () => {
    if (discard.length < 1) {
      return;
    }
    const newHand = [...hand, discard[discard.length - 1]];
    const newDiscard = discard.slice(0, discard.length - 1);
    updateGame({[`players.${uid}.hand`]: newHand, discard: newDiscard});
  };

  return (
    <DnDFrame style={{width: '100%', height: 400}}>
      <SpacedContent header={2}>
        <SpacedContent horizontal space={3}>
          <SpacedContent horizontal space={1}>
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
          <SpacedContent horizontal space={1}>
            <Label>Enemy:</Label>
            <Card>{opponentHand ? opponentHand.length : <Spinner />}</Card>
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
