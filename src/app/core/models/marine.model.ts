export type MarineType = 'scout' | 'tactical' | 'assault' | 'devastator' | 'psyker';

export interface Marine {
  id: string;
  name: string;
  type: MarineType;
  level: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
}