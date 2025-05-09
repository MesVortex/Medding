import type {Routes} from "@angular/router"
import {AuthGuard} from "./auth/guards/auth.guard"
import {AUTH_ROUTES} from "./auth/auth.router"
import {WEDDING_ROUTES} from "./wedding/wedding.routes"
import {SERVICE_ROUTES} from "./weddingService/service.routes"
import {DASHBOARD_ROUTES} from "./dashboard/dashboard.routes"
import {GUEST_ROUTES} from "./guest/guest.routes";
import {PROFILE_ROUTES} from "./shared/profile.routes";
import {VENDOR_ROUTES} from "./shared/vendor.routes";
import {AdminLayoutComponent} from "./shared/layouts/admin-layout/admin-layout.component";
import {DefaultLayoutComponent} from "./shared/layouts/default-layout/default-layout.component";
import {GuestGuard} from "./auth/guards/guest.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },

  // Auth Module Routes
  {
    path: "auth",
    children: AUTH_ROUTES,
    canActivate: [GuestGuard],
  },
  {
    path: "home",
    loadComponent: () => import("./shared/components/landing-page/landing-page.component").then((m) => m.LandingPageComponent),
    canActivate: [GuestGuard],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      // Dashboard Routes
      {
        path: "dashboard",
        children: DASHBOARD_ROUTES,
        canActivate: [AuthGuard],
        data: {requiredRole: "ADMIN"},
      },
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [

      // Wedding Module Routes
      {
        path: "weddings",
        children: WEDDING_ROUTES,
        canActivate: [AuthGuard],
        data: {requiredRole: "ORGANIZER"},
      },
      {
        path: "guests",
        children: GUEST_ROUTES,
      },

      // Service Module Routes
      {
        path: "services",
        children: SERVICE_ROUTES,
      },

      {
        path: "profile",
        children: PROFILE_ROUTES,
        canActivate: [AuthGuard],
      },

      {
        path: "vendor",
        children: VENDOR_ROUTES,
        canActivate: [AuthGuard],
      },
    ]
  },
  {
    path: "unauthorized",
    loadComponent: () => import("./shared/components/unauthorized/unauthorized.component").then((m) => m.UnauthorizedComponent),
  },

  // Not Found Route
  {
    path: "**",
    loadComponent: () => import("./shared/components/not-found/not-found.component").then((m) => m.NotFoundComponent),
  }
]

