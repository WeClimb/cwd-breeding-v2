import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, Validators, NonNullableFormBuilder, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserCreateForm } from '../../../../core/models/user/user-create-form';
import { UserCreateModel } from '../../../../core/models/user/user-create-model';
import { Roles } from '../../../../core/constants/roles.enum';
import { PhoneMaskDirective } from '../../../../shared/directives/phone-mask.directive';
import { MatIconModule } from '@angular/material/icon';
import { getDownloadURL, getStorage, ref } from '@angular/fire/storage';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    PhoneMaskDirective,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent {
  @Input() showGoogleSignIn: boolean = false;
  @Output() formSubmitted = new EventEmitter<UserCreateModel>();
  @Output() googleSignIn = new EventEmitter<void>();

  userCreateForm: FormGroup<UserCreateForm>;
  hidePassword = true;  // For toggling password visibility
  hideConfirmPassword = true;  // For toggling confirm password visibility
  googleIconUrl: string | null = null; 

  constructor(private fb: NonNullableFormBuilder) {
    this.userCreateForm = this.fb.group<UserCreateForm>({
      name: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(10),
        this.passwordValidator()
      ]),
      confirmPassword: this.fb.control('', [Validators.required, this.passwordMatchValidator ]),
      phoneNumber: this.fb.control('', [Validators.required, Validators.minLength(12)]),
      role: this.fb.control(Roles.USER),
    });

    this.loadGoogleIcon();
  }

  // Password validation rules
  passwordValidator() {
    return (control: AbstractControl) => {
      const value = control.value || '';
      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]+/.test(value);
      const validLength = value.length >= 10;

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && validLength;

      return passwordValid ? null : { invalidPassword: true };
    };
  }

  // Validator to check if passwords match
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Methods to dynamically check password rules
  hasUpperCase(): boolean {
    return /[A-Z]+/.test(this.userCreateForm.controls.password.value || '');
  }

  hasLowerCase(): boolean {
    return /[a-z]+/.test(this.userCreateForm.controls.password.value || '');
  }

  hasNumber(): boolean {
    return /[0-9]+/.test(this.userCreateForm.controls.password.value || '');
  }

  hasSpecialChar(): boolean {
    return /[!@#$%^&*(),.?":{}|<>]+/.test(this.userCreateForm.controls.password.value || '');
  }

  hasValidLength(): boolean {
    return (this.userCreateForm.controls.password.value || '').length >= 10;
  }

  matchPasswords(): boolean {
    return this.userCreateForm.controls.password.value === this.userCreateForm.controls.confirmPassword.value;
  }

  onSubmit() {
    if (this.userCreateForm.valid) {
      const userData: UserCreateModel = this.userCreateForm.getRawValue();
      this.formSubmitted.emit(userData);
    }
  }

  onGoogleSignIn() {
    this.googleSignIn.emit();
  }

  loadGoogleIcon() {
    const storage = getStorage();
    const iconRef = ref(storage, 'icons/google-icon.svg');

    getDownloadURL(iconRef)
      .then((url) => {
        this.googleIconUrl = url;
      })
      .catch((error) => {
        console.error('Error fetching Google icon:', error);
      });
  }
}
