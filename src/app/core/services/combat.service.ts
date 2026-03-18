import { Injectable, inject } from '@angular/core';
import { GameStateService } from './game-state.service';

@Injectable({ providedIn: 'root' })
export class CombatService {

  private state = inject(GameStateService);

  tick(): void {
    if (!this.state.isMarineAlive() || !this.state.isEnemyAlive()) return;

    this.marineAttacks();
    if (this.state.isEnemyAlive()) {
      this.enemyAttacks();
    }
  }

  private marineAttacks(): void {
    const marine = this.state.marine();
    const enemy = this.state.enemy();
    const damage = Math.max(1, marine.attack - enemy.defense);
    const newHp = Math.max(0, enemy.hp - damage);

    this.state.enemy.update(e => ({ ...e, hp: newHp }));
    this.state.combatLog.update(log => [
      `${marine.name} inflige ${damage} dégâts à ${enemy.name} (${newHp}/${enemy.maxHp} HP)`,
      ...log.slice(0, 9)
    ]);
  }

  private enemyAttacks(): void {
    const enemy = this.state.enemy();
    const marine = this.state.marine();
    const damage = Math.max(1, enemy.attack - marine.defense);
    const newHp = Math.max(0, marine.hp - damage);

    this.state.marine.update(m => ({ ...m, hp: newHp }));
    this.state.combatLog.update(log => [
      `${enemy.name} inflige ${damage} dégâts à ${marine.name} (${newHp}/${marine.maxHp} HP)`,
      ...log.slice(0, 9)
    ]);
  }

  resetEnemy(): void {
    this.state.enemy.update(e => ({ ...e, hp: e.maxHp }));
    this.state.combatLog.update(log => ['Un nouvel ennemi apparaît !', ...log.slice(0, 9)]);
  }
}