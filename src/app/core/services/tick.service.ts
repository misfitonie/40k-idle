import { Injectable, inject, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { CombatService } from './combat.service';
import { GameStateService } from './game-state.service';

@Injectable({ providedIn: 'root' })
export class TickService implements OnDestroy {

  private state = inject(GameStateService);
  private combat = inject(CombatService);
  private subscription: Subscription | null = null;

  readonly TICK_INTERVAL = 1000;

  start(): void {
    if (this.subscription) return;
    this.subscription = interval(this.TICK_INTERVAL).subscribe(() => {
      this.onTick();
    });
  }

  stop(): void {
    this.subscription?.unsubscribe();
    this.subscription = null;
  }

  private onTick(): void {
    if (!this.state.isEnemyAlive()) {
      this.combat.resetEnemy();
      return;
    }
    if (!this.state.isMarineAlive()) {
      this.stop();
      return;
    }
    this.combat.tick();
  }

  ngOnDestroy(): void {
    this.stop();
  }
}