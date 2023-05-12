import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentInteractionService {

  private gameCreatedSource = new Subject<void>();
  gameCreated$ = this.gameCreatedSource.asObservable();

  private participantCreatedSource = new Subject<void>();
  participantCreated$ = this.participantCreatedSource.asObservable();

  triggerGameCreated() {
    this.gameCreatedSource.next();
  }

  triggerParticipantCreated() {
    this.participantCreatedSource.next();
  }
}
