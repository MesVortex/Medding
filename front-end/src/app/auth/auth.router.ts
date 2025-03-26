import type { Routes } from "@angular/router"

export const AUTH_ROUTES: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadComponent: () => import("./components/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "register",
    loadComponent: () => import("./components/register/register.component").then((m) => m.RegisterComponent),
  },
  {
    path: 'logout',
    loadComponent: () => import("./components/logout/logout.component").then((m) => m.LogoutComponent),
  },
]

