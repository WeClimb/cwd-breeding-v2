import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { SignInModel } from '../../features/sign-in/models/sign-in-model';
import { SignInComponent } from '../../features/sign-in/components/sign-in/sign-in.component';
import { FooterComponent } from "../../core/components/footer/footer.component";
import { Router } from '@angular/router';
import { Roles } from '../../core/constants/roles.enum';
import { UserProfileService } from '../../core/services/user-profile.service';
import { EmailVerificationDialogComponent } from '../../features/email-verification-alert/email-verification-alert.component';
import { MatDialog } from '@angular/material/dialog';


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
    private router: Router,
    private userProfileService: UserProfileService,
    private dialog: MatDialog
  ) {}

  // Handle form submission for email/password sign-in
  handleFormSubmit(signInData: SignInModel) {
    this.authService.login(signInData.email, signInData.password)
      .then(() => {
        this.userProfileService.getUserRole().subscribe((role: Roles) => {
          this.navigateBasedOnRole(role);
        });
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  }

  // Handle Google sign-in
  handleGoogleSignIn() {
    this.authService.signInWithGoogle()
      .then(() => {
        this.userProfileService.getUserRole().subscribe((role: Roles) => {
          this.navigateBasedOnRole(role);
        });
      })
      .catch((error) => {
        console.error('Google sign-in error:', error);
      });
  }

  private navigateBasedOnRole(role: Roles): void {
    const isEmailVerified: boolean = this.authService.checkEmailVerification();

    switch (role) {
      case Roles.ADMIN:
        this.router.navigate(['/admin-dashboard']);
        break;
      default:
        this.router.navigate(['/home']);
    }

    if (!isEmailVerified) {
      this.openEmailVerificationDialog();
    }
  }

  openEmailVerificationDialog(): void {
    this.dialog.open(EmailVerificationDialogComponent, {
      width: '400px',
    });
  }
}
