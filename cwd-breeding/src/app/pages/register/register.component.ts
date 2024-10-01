import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserCreateModel } from '../../core/models/user/user-create-model';
import { UserCreateComponent } from "../../features/register-user/components/user-create/user-create.component";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Observable, map } from 'rxjs';
import {MatStepperModule, StepperOrientation} from '@angular/material/stepper';
import { FooterComponent } from "../../core/components/footer/footer.component";
import { MatDividerModule } from '@angular/material/divider';

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
    MatDividerModule
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });

  stepperOrientation!: Observable<StepperOrientation>;

  constructor(private authService: AuthService) {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

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
