import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  email: string = '';
  password: string = '';



  constructor(
    private userService:  UserService,
    private router: Router
    ){}

  login(): void{
    const userData = {
      email: this.email,
      password: this.password
    };
    this.userService.loginUser(userData).subscribe({
      next: (response) => {
        // Handle successful login
        console.log('User logged in successfully:', response);
        localStorage.setItem('token', response.token); // Add this line
        localStorage.setItem('id', response.user.id);
        localStorage.setItem('name', response.user.name);
        this.router.navigate(['createGame']);
      },
      error: (error) => {
        // Handle login error
        console.log('Login failed:', error);
      }
    });
  }

  logout(): void {
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('token') // Add this line
    };
    this.userService.logoutUser(headers).subscribe({
      next: () => {
        // Handle successful logout
        console.log('User logged out successfully');
        // Clear all tokens stored
        localStorage.clear();
        this.router.navigate(['']);

      },
      error: (error) => {
        // Handle logout error
        console.log('Logout failed:', error);
      }
    });
  }
}
