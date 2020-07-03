import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {HexGrid} from 'react-hexgrid';

import {Board} from './Board';
import {Cards} from './Cards';
import {Objects} from './Objects';
import {HeroInfo} from './HeroInfo';

import {
  initializeBoard,
  setInspectHero,
  selectInspectHero,
  selectActiveGame,
  updateGame,
} from '../Game/GameDuck';

export const GameBoard = () => {
  const dispatch = useDispatch();
  const game = useSelector(selectActiveGame);
  const inspectHero = useSelector(selectInspectHero);

  const updateBoard = board => {
    dispatch(updateGame({board}));
  };

  const handleHeroClick = hero => {
    dispatch(setInspectHero(hero));
  };

  React.useEffect(() => {
    // TODO add gameState for post-initializationt o not accidentally do this twice
    dispatch(initializeBoard());
  }, []);

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <HexGrid width={700} height={550} viewBox="-80 -50 100 100">
          <Board
            updateBoard={updateBoard}
            board={game.board}
            onHeroClick={handleHeroClick}
          />
          <Objects objects={game.objects} />
        </HexGrid>
        {inspectHero && <HeroInfo hero={inspectHero} />}
      </div>
      <Cards />
    </>
  );
};
