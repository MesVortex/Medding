import type { Routes } from "@angular/router"
import { AuthGuard } from "./auth/guards/auth.guard"
import { AUTH_ROUTES } from "./auth/auth.router"
import { WEDDING_ROUTES } from "./wedding/wedding.routes"
import { SERVICE_ROUTES } from "./weddingService/service.routes"
import { DASHBOARD_ROUTES } from "./dashboard/dashboard.routes"
import {GUEST_ROUTES} from "./guest/guest.routes";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },

  // Auth Module Routes
  {
    path: "auth",
    children: AUTH_ROUTES,
  },

  // Wedding Module Routes
  {
    path: "weddings",
    children: WEDDING_ROUTES,
    canActivate: [AuthGuard],
    data: { requiredRole: "ORGANIZER" },
  },
  {
    path: "guests",
    children: GUEST_ROUTES,
  },

  // Service Module Routes
  {
    path: "services",
    children: SERVICE_ROUTES,
    canActivate: [AuthGuard],
  },

  // Dashboard Routes
  {
    path: "dashboard",
    children: DASHBOARD_ROUTES,
    canActivate: [AuthGuard],
    data: { requiredRole: "ADMIN" },
  },

  // Not Found Route
  {
    path: "**",
    loadComponent: () => import("./shared/components/not-found/not-found.component").then((m) => m.NotFoundComponent),
  },
]

