import { Injectable, signal, computed } from '@angular/core';
import { Marine } from '../models/marine.model';
import { Enemy } from '../models/enemy.model';

@Injectable({ providedIn: 'root' })
export class GameStateService {

  marine = signal<Marine>({
    id: '1',
    name: 'Brother Titus',
    type: 'scout',
    level: 1,
    hp: 100,
    maxHp: 100,
    attack: 10,
    defense: 5,
  });

  enemy = signal<Enemy>({
    id: 'ork-1',
    name: 'Ork Boy',
    hp: 80,
    maxHp: 80,
    attack: 8,
    defense: 2,
  });

  combatLog = signal<string[]>([]);

  isMarineAlive = computed(() => this.marine().hp > 0);
  isEnemyAlive = computed(() => this.enemy().hp > 0);
}