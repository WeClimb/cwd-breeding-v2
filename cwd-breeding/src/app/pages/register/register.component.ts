import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserCreateModel } from '../../core/models/user/user-create-model';
import { UserCreateComponent } from "../../features/register-user/components/user-create/user-create.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [UserCreateComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  handleFormSubmit(userData: UserCreateModel) {
    this.authService.signUp(userData).then(() => {
      console.log('User registered and profile saved successfully');
    }).catch((error) => {
      console.error('Error during registration or profile save:', error);
    });
  }

  handleGoogleSignIn() {
    this.authService.signUpWithGoogle().then(() => {
      console.log('Signed up with Google successfully');
    }).catch((error) => {
      console.error('Error during Google sign-up:', error);
    });
  }
  
}
