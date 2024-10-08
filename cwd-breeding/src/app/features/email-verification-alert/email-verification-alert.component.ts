import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-email-verification-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './email-verification-alert.component.html',
  styleUrls: ['./email-verification-alert.component.scss']
})
export class EmailVerificationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EmailVerificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) {}

  resendVerificationEmail() {
    this.authService.resendEmailVerification().then(() => {
      this.dialogRef.close();
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
