import {SUITS, Card} from './card';

const ABILITYTYPES = {
  ACTIVE: 'active',
  PASSIVE: 'passive',
  REACTIVE: 'reactive',
};

type AbilityTypeKeys = keyof typeof ABILITYTYPES;
type AbilityType = typeof ABILITYTYPES[AbilityTypeKeys];

const {ACTIVE, PASSIVE, REACTIVE} = ABILITYTYPES;

const ANY = 'any';
const {CLUB, DIAMOND, FACE, HEART, SPADE}: typeof SUITS = SUITS;

export interface AbilityCost {
  [ANY]: number;
  [CLUB]: number;
  [DIAMOND]: number;
  [FACE]: number;
  [HEART]: number;
  [SPADE]: number;
}

export type CostTypes = keyof AbilityCost;
export interface Ability {
  name: string;
  type: AbilityType;
  cost: AbilityCost;
  description: string;
}

export interface Hero {
  name: string;
  hp: number;
  elements: Card[];
  abilities: Ability[];
}

export const heroes: Hero[] = [
  {
    name: 'Bird',
    hp: 10,
    elements: [],
    abilities: [
      {
        name: 'Move',
        type: ACTIVE,
        cost: {
          [ANY]: 1,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Move 3',
      },
      {
        name: 'Attack',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Attack 2 - Range 3',
      },
      {
        name: 'Global Attack',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 1,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description:
          'Choose an element, if your opponent cannot discard 1 of that element. All enemy units take 1 damage',
      },
      {
        name: 'Antireactive',
        type: PASSIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Opponent cannot use pool cards for reactions',
      },
      {
        name: 'Reflective',
        type: PASSIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description:
          'All actions that cause damage to Bird, also cause 1 damage to the attacker',
      },
      {
        name: 'Heal',
        type: REACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 1,
          [SPADE]: 0,
        },
        description:
          'All actions that cause damage to Bird, also cause 1 damage to the attacker',
      },
    ],
  },
  {
    name: 'Cat',
    hp: 9,
    elements: [HEART, CLUB],
    abilities: [
      {
        name: 'Move',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Move 5',
      },
      {
        name: 'Attack',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Attack 3 - Range 1',
      },
      {
        name: 'Drain Health',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 1,
          [SPADE]: 0,
        },
        description: 'Attack 2 - Heal Self 1 - Range 1',
      },
      {
        name: 'Rupture',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 1,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description:
          'Place a bleed token on an enemy in range 2. They take 2 damage for every hex they move until the end of their next activation',
      },
      {
        name: '9 Lives',
        type: PASSIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Reduce all incoming instances of damage to 1',
      },
      {
        name: 'Lash Out',
        type: REACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 1,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Deal 1 damage to all enemies in range 2',
      },
    ],
  },
  {
    name: 'Chimp',
    hp: 14,
    elements: [CLUB],
    abilities: [
      {
        name: 'Move',
        type: ACTIVE,
        cost: {
          [ANY]: 1,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Move 4',
      },
      {
        name: 'Attack',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Attack 2 - Range 2',
      },
      {
        name: 'Anti Ban Zone',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description:
          'Pick a suit, this suit now counts as any suit for allies until next turn',
      },
      {
        name: 'X Attack',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 1,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description:
          'Attack X - Range 2 - X is the number of cards in your hand',
      },
      {
        name: 'Scrounge',
        type: PASSIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description:
          'At the beginning of his turn, may replace 1 hand card with the last discarded card',
      },
      {
        name: 'Discard Damage',
        type: REACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description:
          'Discard 1 card to deal 3 Damage to any enemy in range 3 (After Action)',
      },
    ],
  },
  {
    name: 'Cow',
    hp: 14,
    elements: [HEART],
    abilities: [
      {
        name: 'Move',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Move 3',
      },
      {
        name: 'Draw Card',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Draw 1 Card',
      },
      {
        name: 'Long Move',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 1,
          [SPADE]: 0,
        },
        description: 'Move any number of units in a straight line',
      },
      {
        name: 'Pull',
        type: ACTIVE,
        cost: {
          [ANY]: 1,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Attack 1 - Pull 2 - Range 3',
      },
      {
        name: 'Phase Shift',
        type: PASSIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description:
          'May pass through units and terrain, dealing 2 damage to heroes passed through',
      },
      {
        name: 'Move React',
        type: REACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 1,
          [SPADE]: 0,
        },
        description: 'Move attacker 1 - Move self 3 (after action)',
      },
    ],
  },
  {
    name: 'Dino',
    hp: 12,
    elements: [],
    abilities: [],
  },
  {
    name: 'Dog',
    hp: 11,
    elements: [],
    abilities: [
      {
        name: 'Move',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Move 4',
      },
      {
        name: 'Straight Line Attack',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 1,
        },
        description: 'Attack 2 all heroes in a straight line',
      },
      {
        name: 'All Resource Attack',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Replace Entire Hand - Attack 3 - Range 3',
      },
      {
        name: 'Swap',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 1,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Swap positions with any ally',
      },
      {
        name: 'Lone Wolf',
        type: PASSIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Deals extra 1 DMG when not in range 3 of any ally',
      },
      {
        name: 'Anything',
        type: REACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 1,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'May perform any active ability (after action)',
      },
    ],
  },
  {
    name: 'Frog',
    hp: 13,
    elements: [HEART, FACE],
    abilities: [
      {
        name: 'Move',
        type: ACTIVE,
        cost: {
          [ANY]: 1,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Move 3',
      },
      {
        name: 'Poison',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Attack 1 + Poison - Range 3',
      },
      {
        name: 'Damage Poisoned',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 1,
          [SPADE]: 0,
        },
        description: 'Deal 3 damage for each poison on one enemy in range 3',
      },
      {
        name: 'Push Attack',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 1,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Attack 1 + Push 2 - Range 2',
      },
      {
        name: 'Poisonous',
        type: PASSIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description:
          'Deal 1 damage to all poisoned units at the start of activation.',
      },
      {
        name: 'Getaway',
        type: REACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 1,
          [FACE]: 0,
          [HEART]: 1,
          [SPADE]: 0,
        },
        description: 'Move attacker 2 move 2 after their action.',
      },
    ],
  },
  {
    name: 'Hog',
    hp: 16,
    elements: [SPADE],
    abilities: [
      {
        name: 'Move',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Move 3',
      },
      {
        name: 'Discard Rage',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Discard 1 card to gain 2 Rage',
      },
      {
        name: 'Attack',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Attack 1 + # of Rage Tokens Spent - Range 1',
      },
      {
        name: 'War Path',
        type: PASSIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description:
          'When there are 3 rage tokens on Hedgehog, reduce each incoming instance of damage by 1',
      },
      {
        name: 'Generate Rage',
        type: PASSIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description:
          'When this unit takes or deals damage, place a rage token on it (up to 3)',
      },
      {
        name: 'Bristles',
        type: REACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 1,
        },
        description:
          'Do 1 damage for every rage token to all enemies in range 1. (After Action)',
      },
    ],
  },
  {
    name: 'Kang',
    hp: 10,
    elements: [SPADE, DIAMOND],
    abilities: [
      {
        name: 'Move',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description:
          'Move to any empty hex within range 3. May then Push 1 on an enemy unit in range 1',
      },
      {
        name: 'Push',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 1,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Push - All  enemy any hexes in straight line',
      },
      {
        name: 'Move Ally',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Move ally in range 2 any units in a straight line',
      },
      {
        name: 'Crossfire',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 1,
        },
        description: '2 Damage to all units on axis',
      },
      {
        name: 'Getaway',
        type: PASSIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description:
          'If an an enemy ends their movement in range 1 of this unit, this unit may move 1',
      },
      {
        name: 'Kick Back',
        type: REACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 1,
        },
        description: 'Attack 2 - Move Enemy 1 - Range 1',
      },
    ],
  },
  {
    name: 'Lion',
    hp: 10,
    elements: [SPADE, DIAMOND],
    abilities: [
      {
        name: 'Move',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Move 3 or Move Ally 2 - Range 2',
      },
      {
        name: 'Attack Control',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 1,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Attack 2 - Move Enemy 2 - Range 2',
      },
      {
        name: 'Duplicate',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 2,
        },
        description:
          'Can use any ally’s active ability without paying its cost',
      },
      {
        name: 'Long Range',
        type: ACTIVE,
        cost: {
          [ANY]: 1,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: '1 Damage -  Any Range straight line',
      },
      {
        name: 'Feel my pain',
        type: PASSIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description:
          'Can transfer up to 3 dmg received per attack to an ally in range 2',
      },
      {
        name: 'Mind Control',
        type: REACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 1,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Ally in range 2 can perform 1 action',
      },
    ],
  },
  {
    name: 'Mouse',
    hp: 14,
    elements: [FACE, DIAMOND],
    abilities: [
      {
        name: 'Move',
        type: ACTIVE,
        cost: {
          [ANY]: 1,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Move 4',
      },
      {
        name: 'Take Discard Card',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Draw the last discarded card into your hand',
      },
      {
        name: 'Attack Move',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 1,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Attack 2 + Move 1 + Attack 2 - Range 1',
      },
      {
        name: 'Multi-Attack',
        type: ACTIVE,
        cost: {
          [ANY]: 1,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Attack 1 + Move 2 + Attack 1 - Range 2',
      },
      {
        name: 'Unreactive',
        type: PASSIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Attacks can not be reacted',
      },
      {
        name: 'Self Destruct',
        type: REACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 2,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'This unit Dies. then Deal 6 damage to all adjacent units',
      },
    ],
  },
  {
    name: 'Panda',
    hp: 18,
    elements: [SPADE, FACE],
    abilities: [
      {
        name: 'Move',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Move 3',
      },
      {
        name: 'Boulder',
        type: ACTIVE,
        cost: {
          [ANY]: 1,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description:
          'Place a rock into an empty square in range 3. Deal 1 damage to all adjacent units',
      },
      {
        name: 'Throw',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 1,
        },
        description:
          'Move any unit in range 1 into any empty hex in range 3. Deal 1 damage to all adjacent units',
      },
      {
        name: 'Rock Charge',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 2,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description:
          'Move 3 into a hex occupied by a rock. Remove the rock and deal 2 damage to all units 	adjacent to that hex',
      },
      {
        name: 'Stampede',
        type: PASSIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description:
          'May end his movement in a hex occupied by an enemy unit and move them to an adjacent empty hex if available',
      },
      {
        name: 'Charge React',
        type: REACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 1,
        },
        description: 'May perform Rock Charge (after action)',
      },
    ],
  },
  {
    name: 'Pig',
    hp: 14,
    elements: [HEART],
    abilities: [
      {
        name: 'Move',
        type: ACTIVE,
        cost: {
          [ANY]: 1,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Move 3',
      },
      {
        name: 'Globalize',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 1,
          [SPADE]: 0,
        },
        description: 'Attack 1 + Move Enemy 1 - global',
      },
      {
        name: 'Attack',
        type: ACTIVE,
        cost: {
          [ANY]: 1,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Attack 2 - Range 2',
      },
      {
        name: 'Pool Burn',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Replace up to 3 elements from the pool.',
      },
      {
        name: 'Opponent Discard Damage',
        type: PASSIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description:
          'Choose 1 card from your hand to put in the ban zone. If there is already a card in the ban zone, swap for that card. Whenever a skill is used by an enemy unit that discards the banned element, that unit takes 2 damage at the end of their action / reaction',
      },
      {
        name: 'Cycle React',
        type: REACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 1,
          [SPADE]: 0,
        },
        description:
          'Cycle up to 3 banned cards to deal 2 damage to the attacker per cycled card',
      },
    ],
  },
  {
    name: 'Tort',
    hp: 16,
    elements: [SPADE, FACE],
    abilities: [
      {
        name: 'Move',
        type: ACTIVE,
        cost: {
          [ANY]: 1,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Move 3',
      },
      {
        name: 'Multi-Attack',
        type: ACTIVE,
        cost: {
          [ANY]: 1,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description: 'Attack 2 all enemies in range 1',
      },
      {
        name: 'Hook',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 1,
        },
        description: 'Attack 2 - Range 3 - Pull',
      },
      {
        name: 'Taunt',
        type: ACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 1,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description:
          "Place a taunt token on all enemies in range 1. Taunted enemies may not target this unit's allies unless the attack also targts this unit",
      },
      {
        name: 'Attack of Opportunity',
        type: PASSIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 0,
        },
        description:
          'Deal 2 damage to any enemy unit that leaves range 1 of this unit ',
      },
      {
        name: 'Reflection',
        type: REACTIVE,
        cost: {
          [ANY]: 0,
          [CLUB]: 0,
          [DIAMOND]: 0,
          [FACE]: 0,
          [HEART]: 0,
          [SPADE]: 1,
        },
        description:
          'Both you and your attacker take all effects of the attack (after action)',
      },
    ],
  },
];
