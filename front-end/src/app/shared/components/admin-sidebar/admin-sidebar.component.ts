import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import {AuthActions} from "../../../auth/store/auth.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: "app-admin-sidebar",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./admin-sidebar.component.html",
  styleUrls: ["./admin-sidebar.component.scss"],
})
export class AdminSidebarComponent {
  @Input() userName = ""
  @Input() userRole = ""

  collapsed = false
  expandedSections: string[] = []

  constructor(private store: Store) {
  }

  navItems = [
    {
      label: "Dashboard",
      route: "/admin/dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    },
    {
      label: "Users",
      route: "/admin/dashboard/users",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    },
    {
      label: "Vendors",
      route: "/admin/dashboard/vendors",
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    }
  ]

  toggleSidebar(): void {
    this.collapsed = !this.collapsed
  }

  toggleSection(sectionName: string): void {
    if (this.isSectionExpanded(sectionName)) {
      this.expandedSections = this.expandedSections.filter((name) => name !== sectionName)
    } else {
      this.expandedSections.push(sectionName)
    }
  }

  isSectionExpanded(sectionName: string): boolean {
    return this.expandedSections.includes(sectionName)
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}

