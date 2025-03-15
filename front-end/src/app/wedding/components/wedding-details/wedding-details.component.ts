import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WeddingService } from '../../services/wedding.service';
import { WeddingResponse } from '../../models/wedding.model';
import { ServiceResponse } from '../../models/service.model';

@Component({
  selector: 'app-wedding-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './wedding-details.component.html',
  styleUrls: ['./wedding-details.component.scss']
})
export class WeddingDetailsComponent implements OnInit {
  wedding: WeddingResponse | null = null;
  services: ServiceResponse[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private weddingService: WeddingService
  ) {}

  ngOnInit(): void {
    const weddingId = this.route.snapshot.paramMap.get('id');
    if (weddingId) {
      this.loadWeddingDetails(+weddingId);
    }
  }

  private loadWeddingDetails(id: number): void {
    this.weddingService.getWeddingById(id).subscribe({
      next: (wedding) => {
        this.wedding = wedding;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load wedding details';
        this.loading = false;
        console.error('Error loading wedding:', error);
      }
    });
  }
}
