import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ComponentInteractionService } from 'src/app/services/component-interaction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.css']
})
export class ListGamesComponent implements OnInit, OnDestroy{
  
  id!: number;
  games!: any[];
  gameCreatedSubscription!: Subscription;
  headers!: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private componentInteractionService: ComponentInteractionService)
    {
      const storedId = localStorage.getItem('id');
      const token = localStorage.getItem('token');
      if (storedId !== null) {
        this.id = parseInt(storedId);
        this.headers = {'Authorization': `Bearer ${token}`};
      }
    }

  ngOnInit(): void {
    this.loadGames();

    this.gameCreatedSubscription = this.componentInteractionService.gameCreated$.subscribe(() => {
      this.loadGames();
    });
  }

  ngOnDestroy(): void {
    this.gameCreatedSubscription.unsubscribe();
  }

  loadGames(): void {
    this.apiService.getGames(this.id, this.headers).subscribe({
      next: (response) => (this.games = response),
      error: (error) => console.log(error),
      complete: () => console.log('request completed')
    });
  }

  deleteGame(id: string){
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if(confirmed){
      this.apiService.destroyGame(id, this.headers).subscribe({
        next: () => {
            // Find the index of the deleted product in the products array
          const index = this.games.findIndex(game => game.id === id);
          if (index !== -1) {
              // Remove the deleted product from the products array
            this.games.splice(index, 1);
            }
          },
        error: (error) => console.log(error),
        complete: () => console.log('delete completed')
      });
    }
  }

  accessGame(game_id: string): void {
    this.router.navigate(['/game', game_id]);
  }

}
