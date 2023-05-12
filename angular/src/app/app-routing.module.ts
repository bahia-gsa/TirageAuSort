import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { ListGamesComponent } from './components/list-games/list-games.component';
import { GameComponent } from './components/game/game.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'createGame', component: CreateGameComponent},
  {path: 'games', component: ListGamesComponent},
  {path: 'game/:id', component: GameComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
