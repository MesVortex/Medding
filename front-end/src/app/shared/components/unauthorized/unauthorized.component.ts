import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { Location } from "@angular/common"

@Component({
  selector: "app-unauthorized",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./unauthorized.component.html",
  styleUrls: ["./unauthorized.component.scss"],
})
export class UnauthorizedComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back()
  }
}

