import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  storeGame(game: {name: string, user_id: number}, headers:any){
    return this.http.post('http://localhost:8000/api/game', game, { headers });
  }

  getGames(id: number, headers:any) {
  return this.http.get<any[]>(`http://localhost:8000/api/games/${id}`, { headers });
}

  destroyGame(id: string, headers:any){
    return this.http.delete(`http://localhost:8000/api/game/${id}`, { headers })
  }

  storeParticipant(participant: {name: string, drawn: number, user_id: number, game_id: string}, headers:any){
    return this.http.post('http://localhost:8000/api/participant', participant, { headers });
  }

  getParticipants(id: number, game_id: string, headers:any) {
    return this.http.get<any[]>(`http://localhost:8000/api/participants/${id}/${game_id}`, { headers });
  }

  destroyParticipant(id: string, game_id: string, headers:any){
    return this.http.delete(`http://localhost:8000/api/participants/${id}/${game_id}`, { headers });
  }

  draw(id: number, game_id: string, headers:any){
    return this.http.get<any[]>(`http://localhost:8000/api/draw/${id}/${game_id}`, { headers });
  }

  getDraws(id: number, game_id: string, headers:any) {
    return this.http.get<any[]>(`http://localhost:8000/api/draws/${id}/${game_id}`, { headers });
  }
}


