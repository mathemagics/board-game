import * as React from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {drawCard, discardCard, shuffle} from 'game/card';

import {Button} from 'component/base/Button';
import {CardGroup} from 'component/base/CardGroup';
import {InfoBar} from './InfoBar';

import {Container, Controls} from './Cards.style';

// TODO don't get updateGame from props
export const Cards = ({updateGame}: {deck: [string]}) => {
  const {gameID} = useParams();
  const {uid} = useSelector(state => state.firebase.auth);
  const {
    deck,
    discard,
    players: {
      [uid]: {hand}
    },
    pool
  } = useSelector(({firestore: {data}}) => data.games && data.games[gameID]);

  const handleHandClick = card => {
    const [discardedHand, newDiscard] = discardCard({card, hand, discard});
    updateGame({
      discard: newDiscard,
      [`players.${uid}.hand`]: discardedHand
    });
  };

  const handleDraw = () => {
    const [card, newDeck] = drawCard(deck);
    const newHand = [...hand, card];
    updateGame({deck: newDeck, [`players.${uid}.hand`]: newHand});
  };

  const handlePoolDraw = poolCard => {
    // TODO move this into game mechanics
    const newDiscard = [...discard, poolCard];
    const index = pool.indexOf(poolCard);
    const [card, newDeck] = drawCard(deck);
    const newPool = [...pool];
    newPool[index] = card;
    updateGame({
      deck: newDeck,
      discard: newDiscard,
      pool: newPool
    });
  };

  const handleReshuffle = () => {
    const combinedDeck = [...discard, ...deck];
    const newDeck = shuffle(combinedDeck);
    updateGame({deck: newDeck, discard: []});
  };

  const handleTakeDiscard = () => {
    const newHand = [...hand, discard[discard.length - 1]];
    const newDiscard = discard.slice(0, discard.length - 1);
    updateGame({[`players.${uid}.hand`]: newHand, discard: newDiscard});
  };

  return (
    <Container>
      <InfoBar
        deckCount={deck.length}
        discardCount={discard.length}
        lastDiscard={discard[discard.length - 1]}
        onTakeDiscard={handleTakeDiscard}
        onPoolDraw={handlePoolDraw}
        pool={pool}
      />
      <CardGroup
        label="Hand:"
        cards={hand}
        isSorted
        onCardDoubleClick={handleHandClick}
      />
      <Controls>
        <Button type="button" onClick={handleDraw}>
          Draw
        </Button>
        <Button type="button" onClick={handleReshuffle}>
          Reshuffle
        </Button>
      </Controls>
    </Container>
  );
};
