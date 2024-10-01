import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { SignInModel } from '../../features/sign-in/models/sign-in-model';
import { SignInComponent } from '../../features/sign-in/components/sign-in/sign-in.component';
import { FooterComponent } from "../../core/components/footer/footer.component";


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
  constructor(private authService: AuthService) {}

  // Handle form submission for email/password sign-in
  handleFormSubmit(signInData: SignInModel) {
    this.authService.login(signInData.email, signInData.password)
      .then(() => {
        console.log('User logged in successfully');
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  }

  // Handle Google sign-in
  handleGoogleSignIn() {
    this.authService.signUpWithGoogle()
      .then(() => {
        console.log('Signed in with Google successfully');
      })
      .catch((error) => {
        console.error('Google sign-in error:', error);
      });
  }
}
