import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string | null = null;

  // Change router to public
  public router: Router;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    router: Router // Assigning to the public property
  ) {
    this.router = router;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/chat']); // Navigate to chat page if logged in
    }
  }

  // Getter for form controls
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
  
    // Stop if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
  
    // Send login request with separate email and password
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.router.navigate(['/chat']); // Redirect to chat page on success
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      },
      (error) => {
        this.errorMessage = 'Something went wrong. Please try again.';
      }
    );
  }
  
}
