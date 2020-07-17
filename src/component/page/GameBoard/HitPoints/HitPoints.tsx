import * as React from 'react';

// TODO style this properly
const HitPointInput = ({label, max, value, onChange}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginRight: 16,
    }}
  >
    <div style={{textAlign: 'center', marginBottom: 4}}>{label}</div>
    <input
      style={{
        border: '1px solid black',
        width: 30,
        height: 30,
        textAlign: 'center',
      }}
      type="number"
      onChange={onChange}
      placeholder={value}
    />
    <span style={{marginTop: 4}}>{`${value}`}</span>
  </div>
);

export const HitPoints = ({player1, player2, onUpdate}) => {
  return (
    <div style={{display: 'flex', marginBottom: 32}}>
      <div style={{marginRight: 16}}>
        <div style={{marginBottom: 8, fontWeight: 700}}>{player1.name}</div>
        <div style={{display: 'flex'}}>
          {player1.heroes.map(hero => (
            <HitPointInput
              key={hero.name}
              label={hero.name}
              onChange={e => onUpdate(hero, e.target.value)}
              value={hero.hp}
            />
          ))}
        </div>
      </div>
      <div>
        <div style={{marginBottom: 8, fontWeight: 700}}>{player2.name}</div>
        <div style={{display: 'flex'}}>
          {player2.heroes.map(hero => (
            <HitPointInput
              key={hero.name}
              label={hero.name}
              onChange={e => onUpdate(hero, e.target.value)}
              value={hero.hp}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
