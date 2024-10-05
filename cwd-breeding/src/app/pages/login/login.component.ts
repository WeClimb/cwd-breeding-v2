import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { SignInModel } from '../../features/sign-in/models/sign-in-model';
import { SignInComponent } from '../../features/sign-in/components/sign-in/sign-in.component';
import { FooterComponent } from "../../core/components/footer/footer.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SignInComponent,
    FooterComponent
],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Handle form submission for email/password sign-in
  handleFormSubmit(signInData: SignInModel) {
    this.authService.login(signInData.email, signInData.password)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  }

  // Handle Google sign-in
  handleGoogleSignIn() {
    this.authService.signUpWithGoogle()
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Google sign-in error:', error);
      });
  }
}
