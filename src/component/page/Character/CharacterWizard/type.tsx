export interface OptionType {
  id: string,
  title: string
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
