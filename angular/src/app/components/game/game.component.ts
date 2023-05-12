import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentInteractionService } from 'src/app/services/component-interaction.service';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy{
  id!: number;
  game_id!: string;
  participantCreatedSubscription!: Subscription;
  headers!: any;
  participants!: any[];
  drawn!: any[];
  draws!: any[];


  constructor(
    private activatedRoute: ActivatedRoute,
    private componentInteractionService: ComponentInteractionService,
    private apiService: ApiService
    )
    {
      const storedId = localStorage.getItem('id');
      const token = localStorage.getItem('token');
      if (storedId !== null) {
        this.id = parseInt(storedId);
        this.headers = {'Authorization': `Bearer ${token}`};
      }
    }

  ngOnInit(): void {
    this.game_id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.loadParticipants();
    this.loadDraws();
    console.log(this.game_id);
    this.participantCreatedSubscription = this.componentInteractionService.participantCreated$.subscribe(() => {
      this.loadParticipants();
    });
  }

  ngOnDestroy(): void {
    this.participantCreatedSubscription.unsubscribe();
  }

  loadParticipants(): void {
    this.apiService.getParticipants(this.id, this.game_id, this.headers).subscribe({
      next: (response) => (this.participants = response),
      error: (error) => console.log(error),
      complete: () => console.log('request completed')
    });
  }


  deleteParticipant(id: string){
    const confirmed = window.confirm('Are you sure you want to delete this participant?');
    if(confirmed){
      this.apiService.destroyParticipant(id, this.game_id, this.headers).subscribe({
        next: () => {
            // Find the index of the deleted product in the products array
          const index = this.participants.findIndex(participant => participant.id === id);
          if (index !== -1) {
              // Remove the deleted product from the products array
            this.participants.splice(index, 1);
            }
          },
        error: (error) => console.log(error),
        complete: () => console.log('delete completed')
      });
    }
  }

  draw(): void{
    this.apiService.draw(this.id, this.game_id, this.headers).subscribe({
      next: (response) => {
        this.drawn = response;
        this.loadParticipants();
        this.loadDraws();
      },
      error: (error) => console.log(error),
      complete: () => console.log('request completed')
    });
  }

  loadDraws(): void{
    this.apiService.getDraws(this.id, this.game_id, this.headers).subscribe({
      next: (response) => (this.draws = response),
      error: (error) => console.log(error),
      complete: () => console.log('request completed')
    });
  }
  
}
