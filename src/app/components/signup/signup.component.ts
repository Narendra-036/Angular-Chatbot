import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value 
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { fullName, email, password } = this.signupForm.value;
      this.authService.register(fullName, email, password).subscribe(
        response => {
          console.log('Registration successful', response);
          // Navigate to login or home page after successful registration
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Registration error', error);
        }
      );
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
