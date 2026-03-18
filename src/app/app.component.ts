import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { GameStateService } from './core/services/game-state.service';
import { TickService } from './core/services/tick.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, UpperCasePipe]
})
export class AppComponent implements OnInit {
  state = inject(GameStateService);
  tick = inject(TickService);

  ngOnInit(): void {
    this.tick.start();
  }
}