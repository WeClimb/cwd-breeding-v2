import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SnackbarService } from '../../core/services/snackbar-service.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService  // Inject the SnackbarService
  ) {}

  resendVerificationEmail() {
    this.authService.resendEmailVerification()
      .then(() => {
        this.snackbarService.openSnackBar('Verification email has been resent. Please check your inbox.');
      })
      .catch((error) => {
        console.error('Error resending email verification:', error);
        this.snackbarService.openSnackBar('Error resending email. Please try again later.');
      });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
