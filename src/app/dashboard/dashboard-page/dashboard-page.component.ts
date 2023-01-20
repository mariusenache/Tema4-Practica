import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/_core/models/Game';
import { GameDataService } from 'src/app/_core/services/game-data.service';
import { GamesService } from 'src/app/_core/services/games.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  gameList = [];
  gameName: string;
  gameDescription: string;

  // prettier ignore
  constructor(
    private router: Router,
    private gamesService: GamesService,
    private gameDataService: GameDataService,
  ) { }

  ngOnInit(): void {
    this.gamesService.getGames().subscribe((res) => {
      this.gameList = res
    });
  }

  navigateToGamePage(gameInfo: any): void {
    this.gameDataService.selectedGame = gameInfo;
    this.router.navigate(['/game-page'], { queryParams: { gameId: gameInfo.id } });
  }

  addNewGame(): void {
    const gameInfo = {
      title: this.gameName,
      description: this.gameDescription
    }
    this.gamesService.addGame(gameInfo).subscribe((res) => this.gameList.push(res));
  }
}
