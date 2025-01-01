import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password, rememberMe } = this.loginForm.value;
      console.log('Form Values:', { username, password, rememberMe });

      this.http.post('http://localhost:3000/login', { username, password }).subscribe({
        next: (response: any) => {
          console.log('Login successful:', response.message);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Invalid Credentials');
        },
      });
    } else {
      console.error('Login form is invalid');
    }
  }
}
