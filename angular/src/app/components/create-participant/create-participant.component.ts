import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ComponentInteractionService } from 'src/app/services/component-interaction.service';


@Component({
  selector: 'app-create-participant',
  templateUrl: './create-participant.component.html',
  styleUrls: ['./create-participant.component.css']
})
export class CreateParticipantComponent {
  @Input() game_id!: string;
  headers!: any;
  name!: string;
  id!: number;
  drawn: number = 0



  constructor(
    private apiService: ApiService,
    private componentInteractionService: ComponentInteractionService)  
  {
    const storedId = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    if (storedId !== null) {
      this.id = parseInt(storedId);
      this.headers = {'Authorization': `Bearer ${token}`};
    }
  }



  createParticipant(){
    const game = {name: this.name, drawn: this.drawn, user_id: this.id, game_id: this.game_id}
    this.apiService.storeParticipant(game, this.headers).subscribe({
      next: (response) => {
        console.log(response);
        // Trigger the event to indicate a game has been created
        this.componentInteractionService.triggerParticipantCreated();
      },
      error: (error) => console.log(error),
      complete: () => {
        console.log('request completed');
      }
    });
  }


}
