import { Component, Input } from "@angular/core"
import {CommonModule, NgOptimizedImage} from "@angular/common"

@Component({
  selector: "app-moroccan-pattern",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <div class="relative overflow-hidden" [ngClass]="containerClass">
      <div class="absolute inset-0 opacity-10">
        <img [ngSrc]="'../../../assets/images/' + pattern" class="w-full h-full object-cover" alt="Moroccan pattern" fill/>
      </div>
      <div class="relative z-10">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class MoroccanPatternComponent {
  @Input() pattern = "moroccan-pattern-1.png"
  @Input() containerClass = ""
}

