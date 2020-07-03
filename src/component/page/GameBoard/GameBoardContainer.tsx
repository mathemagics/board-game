import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {HexGrid} from 'react-hexgrid';

import {Board} from './Board';
import {Cards} from './Cards';
import {HeroInfo} from './HeroInfo';
import {HitPoints} from './HitPoints';
import {Objects} from './Objects';

import {
  initializeBoard,
  setInspectHero,
  selectInspectHero,
  selectActiveGame,
  updateGame,
} from '../Game/GameDuck';

export const GameBoard = () => {
  const dispatch = useDispatch();
  const {player1, player2, board, objects} = useSelector(selectActiveGame);
  const inspectHero = useSelector(selectInspectHero);

  const updateBoard = newBoard => {
    dispatch(updateGame({board: newBoard}));
  };

  const handleHeroClick = hero => {
    dispatch(setInspectHero(hero));
  };

  const handleUpdateHitPoints = (hero, hitPoints) => {
    dispatch(updateHitPoints(hero, hitPoints));
  };

  React.useEffect(() => {
    // TODO add gameState for post-initialization to not accidentally do this twice
    dispatch(initializeBoard());
  }, []);

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <HexGrid width={700} height={550} viewBox="-80 -50 100 100">
          <Board
            updateBoard={updateBoard}
            board={board}
            onHeroClick={handleHeroClick}
          />
          <Objects objects={objects} />
        </HexGrid>
        <div style={{fontSize: 14}}>
          <HitPoints
            player1={player1}
            player2={player2}
            onUpdate={handleUpdateHitPoints}
          />
          {inspectHero && <HeroInfo hero={inspectHero} />}
        </div>
      </div>

      <Cards />
    </>
  );
};
