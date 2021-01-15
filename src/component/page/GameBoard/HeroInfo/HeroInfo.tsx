import * as React from 'react';

import {
  GiCutDiamond,
  GiClubs,
  GiCrownedSkull,
  GiHeartBeats,
  GiSpadeSkull,
} from 'react-icons/gi';
import {FaUndo} from 'react-icons/fa';

import {Ability as AbilityType, CostTypes, Hero} from 'game/hero';

interface AbilityProps {
  ability: AbilityType;
}

// TODO this should probably have its own container
// TODO this code is garbage and duplicated in Card
const Ability: React.FC<AbilityProps> = ({ability}) => (
  <div style={{marginBottom: 12}}>
    <div style={{marginBottom: 4}}>
      <span style={{fontWeight: 700, marginRight: 8}}>{ability.name}</span>
      {Object.keys(ability.cost).map((cost: CostTypes) => {
        let Icon;
        let color;

        switch (cost) {
          case 'any':
            Icon = FaUndo;
            color = 'purple';
            break;

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

          default:
            break;
        }

        if (ability.cost[cost] === 1) {
          return <Icon color={color} />;
        }
        if (ability.cost[cost] === 2) {
          return (
            <>
              <Icon color={color} />
              <Icon color={color} />
            </>
          );
        }
        return null;
      })}
    </div>
    <div>{ability.description}</div>
  </div>
);

interface HeroInfoProps {
  hero: Hero;
}

export const HeroInfo: React.FC<HeroInfoProps> = ({hero}) => {
  return (
    <div style={{width: 400, marginTop: 16, fontSize: 14}}>
      <div
        style={{marginBottom: 16, fontSize: 18, fontWeight: 700}}
      >{`${hero.name} - ${hero.hp} HP`}</div>
      <div>
        {hero.abilities.map(ability => (
          <Ability ability={ability} key={ability.name} />
        ))}
      </div>
    </div>
  );
};
