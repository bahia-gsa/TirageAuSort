import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ComponentInteractionService } from 'src/app/services/component-interaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent {
  name!: string;
  id!: number;
  userName!: string;
  headers!: any;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private router: Router,
    private componentInteractionService:ComponentInteractionService)
  {
    const storedId = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    if (storedId !== null && name !== null) {
      this.id = parseInt(storedId);
      this.userName = name;
      this.headers = {'Authorization': `Bearer ${token}`};
    }
  }

  createGame(){
    const game = {name: this.name, user_id: this.id}
    this.apiService.storeGame(game, this.headers).subscribe({
      next: (response) => {
        console.log(response);
        // Trigger the event to indicate a game has been created
        this.componentInteractionService.triggerGameCreated();
      },
      error: (error) => console.log(error),
      complete: () => {
        console.log('request completed');
      }
    });
  }

  logout(): void {

    this.userService.logoutUser(this.headers).subscribe({
      next: () => {
        // Handle successful logout
        console.log('User logged out successfully');
        // Clear all tokens stored
        localStorage.clear();
        this.router.navigate(['login']);

      },
      error: (error) => {
        // Handle logout error
        console.log('Logout failed:', error);
      }
    });
  }

}
