import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../../auth/models/user.model";
import {AuthActions} from "../../../auth/store/auth.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showMobileMenu = false;
  showProfileDropdown = false;
  showWeddingsDropdown = false;
  showMobileWeddingsDropdown = false;

  user: User | null = null;
  userRole: string = '';
  userName: string = '';
  userEmail: string = '';
  userInitial: string = '';

  constructor(
    private authService: AuthService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
      if (user) {
        this.userRole = user.role;
        this.userName = user.username;
        this.userEmail = user.email;
        this.userInitial = user.username.charAt(0).toUpperCase();
      }
    });
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
    // Close other dropdowns when toggling mobile menu
    if (this.showMobileMenu) {
      this.showProfileDropdown = false;
      this.showWeddingsDropdown = false;
    }
  }

  toggleProfileDropdown(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    // Simply toggle the dropdown state
    this.showProfileDropdown = !this.showProfileDropdown;

    // Close other dropdowns when toggling profile dropdown
    if (this.showProfileDropdown) {
      this.showWeddingsDropdown = false;
    }
  }

  toggleWeddingsDropdown(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    // Simply toggle the dropdown state
    this.showWeddingsDropdown = !this.showWeddingsDropdown;

    // Close other dropdowns when toggling weddings dropdown
    if (this.showWeddingsDropdown) {
      this.showProfileDropdown = false;
    }
  }

  toggleMobileWeddingsDropdown(): void {
    this.showMobileWeddingsDropdown = !this.showMobileWeddingsDropdown;
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
    // Close all dropdowns and menus
    this.showMobileMenu = false;
    this.showProfileDropdown = false;
    this.showWeddingsDropdown = false;
    this.showMobileWeddingsDropdown = false;
  }
}
