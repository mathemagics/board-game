import * as React from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {drawCard, discardCard, shuffle} from 'game/card';

import {SpacedContent} from 'component/base/SpacedContent';
import {Button} from 'component/base/Button';
import {CardGroup} from 'component/base/CardGroup';
import {Label} from 'component/base/Label';

// TODO don't get updateGame from props
export const Cards = ({updateGame}: {deck: [string]}) => {
  const {gameID} = useParams();
  const {uid} = useSelector(state => state.firebase.auth);
  const {
    deck,
    discard,
    players: {
      [uid]: {hand},
    },
    pool,
  } = useSelector(({firestore: {data}}) => data.games && data.games[gameID]);

  const handleHandClick = card => {
    const [discardedHand, newDiscard] = discardCard({card, hand, discard});
    updateGame({
      discard: newDiscard,
      [`players.${uid}.hand`]: discardedHand,
    });
  };
  const handleReshuffle = () => {
    const combinedDeck = [...discard, ...deck];
    const newDeck = shuffle(combinedDeck);
    updateGame({deck: newDeck, discard: []});
  };

  const handleDraw = () => {
    if (deck.length === 0) {
      handleReshuffle();
    }

    const [card, newDeck] = drawCard(deck);
    const newHand = [...hand, card];
    updateGame({deck: newDeck, [`players.${uid}.hand`]: newHand});
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

  const handleTakeDiscard = () => {
    const newHand = [...hand, discard[discard.length - 1]];
    const newDiscard = discard.slice(0, discard.length - 1);
    updateGame({[`players.${uid}.hand`]: newHand, discard: newDiscard});
  };

  return (
    <SpacedContent header={2}>
      <SpacedContent horizontal>
        <Label>Deck:</Label>
        <span>{deck.length}</span>
        <Label>Discard:</Label>
        <span>{discard.length}</span>
        <CardGroup
          label="Pool:"
          cards={pool}
          isSorted
          onCardDoubleClick={handlePoolDraw}
        />
        <CardGroup
          label="Last Discard:"
          cards={[discard[discard.length - 1]]}
          isSorted
          onCardDoubleClick={handleTakeDiscard}
        />
      </SpacedContent>
      <CardGroup
        label="Hand:"
        cards={hand}
        isSorted
        onCardDoubleClick={handleHandClick}
      />
      <SpacedContent horiztonal>
        {deck.length === 0 ? (
          <Button type="button" onClick={handleReshuffle}>
            Reshuffle
          </Button>
        ) : (
          <Button type="button" onClick={handleDraw}>
            Draw
          </Button>
        )}
      </SpacedContent>
    </SpacedContent>
  );
};
