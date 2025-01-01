import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  SignUpForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.SignUpForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    // this.SignUpForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', Validators.required),
    // }); Jus picked FormBuilder for shorter code - Import FromControl 
    
  }

  onSubmit() {
    if (this.SignUpForm.valid) {
      const formData = this.SignUpForm.value;
      this.http.post('http://localhost:3000/signup', formData).subscribe({
        next: (response) => {
          console.log('User created:', response);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.status === 400 && err.error.message === 'User already exists') {
            this.errorMessage = 'This username is already taken. Please choose another one.';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
        },
      });
    }
  }
}