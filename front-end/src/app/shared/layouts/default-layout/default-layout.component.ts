import { Component } from "@angular/core"
import { RouterModule } from "@angular/router"
import { CommonModule } from "@angular/common"
import { NavbarComponent } from "../../components/navbar/navbar.component"
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: "app-default-layout",
  standalone: true,
  imports: [RouterModule, CommonModule, NavbarComponent],
  template: `
    <div class="min-h-screen bg-[#FFF9F5]">
      <app-navbar
      ></app-navbar>
      <div class="container w-full mx-auto px-4 pb-6">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class DefaultLayoutComponent {
  username: string = '';

  constructor(public authService: AuthService) {
    this.authService.getCurrentUser().subscribe(user => {
      this.username = user.username;
    });
  }
}

