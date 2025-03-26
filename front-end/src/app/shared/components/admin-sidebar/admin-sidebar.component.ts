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
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      label: "Weddings",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      children: [
        {
          label: "All Weddings",
          route: "/admin/weddings",
          icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
        },
        {
          label: "Pending",
          route: "/admin/weddings/pending",
          icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
        },
      ],
    },
    {
      label: "Services",
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      children: [
        {
          label: "All Services",
          route: "/admin/services",
          icon: "M4 6h16M4 10h16M4 14h16M4 18h16",
        },
        {
          label: "Add Service",
          route: "/admin/services/add",
          icon: "M12 4v16m8-8H4",
        },
      ],
    },
    {
      label: "Users",
      route: "/admin/users",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    },
    {
      label: "Settings",
      route: "/admin/settings",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    },
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

