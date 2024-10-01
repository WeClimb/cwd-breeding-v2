import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterLinkActive,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    NgFor
    ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

   // Define your menu items here
   navLinks = [
    { label: 'Home', path: '/home' },
    { label: 'Our Work', path: '/our-work' }, 
    { label: 'Services', path: '/services' },
    { label: 'About Us', path: '/about' },
    { label: 'Get in Touch', path: '/get-in-touch' },
    { label: 'FAQ', path: '/faq' } 
  ];

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
