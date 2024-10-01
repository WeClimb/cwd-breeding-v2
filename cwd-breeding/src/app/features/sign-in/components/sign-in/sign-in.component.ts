import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, Validators, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { getStorage, ref, getDownloadURL } from '@angular/fire/storage';
import { SignInModel } from '../../models/sign-in-model';
import { SignInFormModel } from '../../models/sign-in-form-model';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  @Input() showGoogleSignIn: boolean = false;  // Control visibility of Google sign-in
  @Output() formSubmitted = new EventEmitter<SignInModel>();  // Emit SignInModel
  @Output() googleSignIn = new EventEmitter<void>();  // Emit when Google sign-in is clicked

  signInForm: FormGroup<SignInFormModel>;  // Typed FormGroup
  googleIconUrl: string | null = null;

  constructor(
    private fb: NonNullableFormBuilder
  ) {
    // Initialize form using typed SignInFormModel
    this.signInForm = this.fb.group<SignInFormModel>({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    });

    // Fetch Google icon from Firebase Storage
    this.loadGoogleIcon();
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.formSubmitted.emit(this.signInForm.getRawValue() as SignInModel);  // Emit typed data
    }
  }

  // Emit Google sign-in event
  onGoogleSignIn() {
    this.googleSignIn.emit();
  }

  loadGoogleIcon() {
    const storage = getStorage();  // Initialize Firebase Storage
    const iconRef = ref(storage, 'icons/google-icon.svg');  // Reference to the icon's location

    getDownloadURL(iconRef)
      .then((url) => {
        this.googleIconUrl = url;  // Store the download URL
      })
      .catch((error) => {
        console.error('Error fetching Google icon:', error);
      });
  }
}
