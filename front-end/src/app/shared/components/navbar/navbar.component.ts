import { Component, Input, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule, type Router } from "@angular/router"
import {AuthService} from "../../../auth/services/auth.service";

interface NavLink {
  label: string
  route: string
  children?: NavLink[]
}

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  @Input() userName = ""
  @Input() userAvatar = ""
  @Input() isLoggedIn = false

  mobileMenuOpen = false
  profileMenuOpen = false

  navLinks: NavLink[] = [
    { label: "Home", route: "/" },
    { label: "Services", route: "/services" },
    {
      label: "Weddings",
      route: "/weddings",
      children: [
        { label: "My Weddings", route: "/weddings" },
        { label: "Create Wedding", route: "/weddings/create" },
      ],
    },
    { label: "Vendors", route: "/vendors" },
    { label: "About", route: "/about" },
    { label: "Contact", route: "/contact" },
  ]

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen
    if (this.mobileMenuOpen) {
      this.profileMenuOpen = false
    }
  }

  toggleProfileMenu(): void {
    this.profileMenuOpen = !this.profileMenuOpen
  }

  closeAllMenus(): void {
    this.mobileMenuOpen = false
    this.profileMenuOpen = false
  }

  logout(): void {
    this.closeAllMenus()
    this.authService.logout()
  }
}

