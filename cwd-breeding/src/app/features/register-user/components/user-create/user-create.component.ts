import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, Validators, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
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

  googleIconUrl: string | null = null; 

  constructor(
    private fb: NonNullableFormBuilder
  ) {
    this.userCreateForm = this.fb.group<UserCreateForm>({
      name: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      phoneNumber: this.fb.control('', [Validators.required, Validators.minLength(12)]),
      role: this.fb.control(Roles.USER),
    });

    this.loadGoogleIcon();

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