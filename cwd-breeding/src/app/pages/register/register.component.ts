import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserCreateModel } from '../../core/models/user/user-create-model';
import { UserCreateComponent } from "../../features/register-user/components/user-create/user-create.component";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { FooterComponent } from "../../core/components/footer/footer.component";
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RanchCreateComponent } from '../../features/ranch-creation/components/ranch-create/ranch-create.component';
import { ConfirmationComponent } from "../../shared/components/confirmation/confirmation.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    UserCreateComponent,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe,
    FooterComponent,
    MatDividerModule,
    MatProgressBarModule,
    NgIf,
    RanchCreateComponent,
    ConfirmationComponent
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent  {
  private _formBuilder = inject(FormBuilder);

  loading = false;
  registerCompleted = false;

  constructor(private authService: AuthService) {
  }

  handleFormSubmit(userData: UserCreateModel) {
    this.loading = true;
    this.authService.signUp(userData).then(() => {
      this.registerCompleted = true;
      this.loading = false;
    }).catch((error) => {
      console.error('Error during registration or profile save:', error);
    });
  }

  handleGoogleSignIn() {
    this.loading = true;
    this.authService.signUpWithGoogle().then(() => {
      this.registerCompleted = true;
      this.loading = false;
    }).catch((error) => {
      console.error('Error during Google sign-up:', error);
    });
  } 
}
