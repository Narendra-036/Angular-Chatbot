import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../environments/firebase';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, signInWithPopup } from "firebase/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string | null = null;
  private app = initializeApp(firebaseConfig);  // Ensure Firebase initialization


  public router: Router;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    router: Router 
  ) {
    this.router = router;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/chat']); 
    }
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.errorMessage = null;
    this.submitted = true;
  
    // Stop if form is invalid
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter valid email and password';
      return;
    }
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      (response) => {
        if (response.status === 'success') {
          localStorage.setItem('userToken', response.token); // Store token in localStorage
          localStorage.setItem('userEmail', this.loginForm.value.email); // Store email in localStorage
          this.router.navigate(['/chat']); 
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      },
      (error) => {
        this.errorMessage = 'Something went wrong. Please try again.';
      }
    );
  }

  googleLogin(): void {
    const auth = getAuth(this.app);
    const provider = new GoogleAuthProvider();

      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          const user = result.user;
          console.log('Google login successful!', user, token);
          const dispalyName = user.displayName;
          const email = String(user.email);
          const password = user.uid;
          const fullName = String(dispalyName);
          const quick_signup = true;
          const provider_platform = 'google';
          this.authService.register(fullName, email, password, {'quick_signup': quick_signup, 'provider_platform': provider_platform}).subscribe(
            response => {
              this.authService.login(email, password).subscribe(
                (response) => {
                  if (response.status === 'success') {
                    localStorage.setItem('userToken', response.token); 
                    localStorage.setItem('userEmail', email); 
                    this.router.navigate(['/chat']); 
                  } else {
                    this.errorMessage = 'Invalid email or password';
                  }
                },
                (error) => {
                  this.errorMessage = 'Something went wrong. Please try again.';
                }
              );
            },
            error => {
              console.error('Registration error', error);
            }
          );

        })
        .catch((error) => {
          // Handle errors here
          const errorMessage = error.message;
          this.errorMessage = errorMessage;
        });
    }

  appleLogin(): void {
    const auth = getAuth();
    const provider = new OAuthProvider('apple.com');
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Apple login successful!', result);
        localStorage.setItem('userToken', result.user.uid);
        
      })
      .catch((error) => {
        console.error('Apple login failed:', error);
        this.errorMessage = 'Apple login failed. Please try again.';
      });
  }

  facebookLogin(): void {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Facebook login successful!', result);
        localStorage.setItem('userToken', result.user.uid);
        this.router.navigate(['/chat']);
      })
      .catch((error) => {
        console.error('Facebook login failed:', error);
        this.errorMessage = 'Facebook login failed. Please try again.';
      });
  }

  twitterLogin(): void {
    const auth = getAuth();
    const provider = new OAuthProvider('twitter.com');
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Twitter login successful!', result);
        localStorage.setItem('userToken', result.user.uid);
        this.router.navigate(['/chat']);
      })
      .catch((error) => {
        console.error('Twitter login failed:', error);
        this.errorMessage = 'Twitter login failed. Please try again.';
      });
  }

  microsoftLogin(): void {
    const auth = getAuth();
    const provider = new OAuthProvider('microsoft.com');
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Microsoft login successful!', result);
        localStorage.setItem('userToken', result.user.uid);
        this.router.navigate(['/chat']);
      })
      .catch((error) => {
        console.error('Microsoft login failed:', error);
        this.errorMessage = 'Microsoft login failed. Please try again.';
      });
  }

  yahooLogin(): void {
    const auth = getAuth();
    const provider = new OAuthProvider('yahoo.com');
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Yahoo login successful!', result);
        localStorage.setItem('userToken', result.user.uid);
        this.router.navigate(['/chat']);
      })
      .catch((error) => {
        console.error('Yahoo login failed:', error);
        this.errorMessage = 'Yahoo login failed. Please try again.';
      });
  }
}
