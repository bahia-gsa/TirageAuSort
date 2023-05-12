import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name: string = '';
  email: string = '';
  password: string = '';


  constructor(
    private userService:  UserService,
    private router: Router
    ){}

  register(): void{
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password
    };
    this.userService.registerUser(userData).subscribe({
      next: (response) => {
        console.log('User registered successfully:', response);
        this.router.navigate(['login']);
      },
      error: (error) => {
        console.log('Registration failed:', error);
      }
    });
  }

}
