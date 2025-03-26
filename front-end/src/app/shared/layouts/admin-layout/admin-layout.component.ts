import { Component, type OnInit } from "@angular/core"
import { RouterModule } from "@angular/router"
import { CommonModule } from "@angular/common"
import { AdminSidebarComponent } from "../../components/admin-sidebar/admin-sidebar.component"
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: "app-admin-layout",
  standalone: true,
  imports: [RouterModule, CommonModule, AdminSidebarComponent],
  template: `
    <div class="min-h-screen bg-[#FFF9F5]">
      <app-admin-sidebar
        [userName]="username"
        [userRole]="user_role"
      >
        <div class="p-6">
          <router-outlet></router-outlet>
        </div>
      </app-admin-sidebar>
    </div>
  `,
})
export class AdminLayoutComponent implements OnInit {
  username: string = "";
  user_role: string = "";

  constructor(public authService: AuthService) {
    this.authService.getCurrentUser().subscribe(user => {
      this.username = user.username;
      this.user_role = user.role;
    });
  }

  ngOnInit(): void {}
}

