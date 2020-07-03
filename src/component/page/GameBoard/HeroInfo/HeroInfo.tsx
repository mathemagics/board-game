import * as React from 'react';

const Ability = ({ability}) => (
  <div style={{marginBottom: 12}}>
    <div style={{fontWeight: 700}}>{ability.name}</div>
    <div>{ability.description}</div>
  </div>
);

export const HeroInfo = ({hero}) => {
  return (
    <div style={{width: 400, marginTop: 16, fontSize: 14}}>
      <div style={{marginBottom: 16}}>
        {`${hero.name} - ${hero.hp}hp - `}
        {hero.elements.map(element => (
          <span key={element}>{element}</span>
        ))}
      </div>
      <div>
        {hero.abilities.map(ability => (
          <Ability ability={ability} key={ability.name} />
        ))}
      </div>
    </div>
  );
};
