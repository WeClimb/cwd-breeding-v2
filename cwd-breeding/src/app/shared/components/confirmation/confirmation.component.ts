import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {
  @Input() title: string = 'Congrats!';
  @Input() subTitle: string = 'You have successfully completed the action.';
  @Input() buttonLabel: string = 'Confirm';
  @Input() buttonRoute: string = '/home';

  constructor(private router: Router) {}

  navigateToRoute(): void {
    this.router.navigate([this.buttonRoute]);
  }

}
