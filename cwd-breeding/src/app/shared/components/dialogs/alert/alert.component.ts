import { Component, Input } from '@angular/core';
import { AlertModel } from '../../../models/alert-model';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  title: string = 'Alerts';
  @Input() alerts: AlertModel[] = [];
}
