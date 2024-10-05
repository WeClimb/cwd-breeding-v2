import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RanchFormModel } from '../../models/ranch-form-model';
import { SocialsModel } from '../../../../core/models/ranch/socials-model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PhoneMaskDirective } from '../../../../shared/directives/phone-mask.directive';

@Component({
  selector: 'app-ranch-create',
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
  templateUrl: './ranch-create.component.html',
  styleUrl: './ranch-create.component.scss'
})
export class RanchCreateComponent implements OnInit {
  ranchForm!: FormGroup<RanchFormModel>;

  constructor(
    private _formBuilder: NonNullableFormBuilder,
  ) { }

  ngOnInit(): void {
    this.ranchForm = this._formBuilder.group<RanchFormModel>({
      name: this._formBuilder.control('', Validators.required),
      ownerName: this._formBuilder.control('', Validators.required),
      website: this._formBuilder.control(''),
      address: this._formBuilder.control('', Validators.required),
      city: this._formBuilder.control('', Validators.required),
      state: this._formBuilder.control('', Validators.required),
      zipcode: this._formBuilder.control('', Validators.required),
      phoneNumber: this._formBuilder.control('', Validators.required),
      email: this._formBuilder.control('', Validators.required),
      stripeId: this._formBuilder.control(''),
      userId: this._formBuilder.control('', Validators.required),
      deer: this._formBuilder.control([]),
      ranchProfileDescription: this._formBuilder.control('', Validators.required),
      socials: this._formBuilder.control<SocialsModel | null>(null),
      coverPhoto: this._formBuilder.control('', Validators.required),
      profileImage: this._formBuilder.control('', Validators.required),
    });
  }

  onSubmit(): void {
    console.log(this.ranchForm.value);
  }
}
