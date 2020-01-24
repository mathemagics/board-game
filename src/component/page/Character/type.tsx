export interface OptionType {
  id: string,
  title: string
}

export type CharacterBuilderType = 'standard' | 'quickstart' | 'random';

export interface CharacterType {
  id: number,
}

export interface SpeciesType {
  id: number, name: string,
}

export interface StatsType {
  charm: number,
  cunning: number,
  finesse: number,
  luck: number,
  might: number,
}

export interface PlaybookType {
  id: number,
  name: string,
  description: string,
  baseStats: StatsType,
}
