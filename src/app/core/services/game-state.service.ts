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
    xp: 0,
    maxXp: 100,
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

  grantXp(amount: number): void {
    const m = this.marine();
    let { xp, level, maxXp, attack, defense, maxHp } = m;
    xp += amount;

    const levelUps: number[] = [];
    while (xp >= maxXp) {
      xp -= maxXp;
      level++;
      maxXp = level * 100;
      attack += 2;
      defense += 1;
      maxHp += 20;
      levelUps.push(level);
    }

    this.marine.set({ ...m, xp, level, maxXp, attack, defense, maxHp });

    if (levelUps.length > 0) {
      const msgs = levelUps.map(lvl => `${m.name} monte au niveau ${lvl} ! (ATK +2, DEF +1, HP +20)`);
      this.combatLog.update(log => [...msgs, ...log].slice(0, 10));
    }
  }
}