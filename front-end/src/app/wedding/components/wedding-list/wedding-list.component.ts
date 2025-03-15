import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {WeddingService} from "../../services/wedding.service";
import {WeddingResponse} from "../../models/wedding.model";

@Component({
  selector: 'app-wedding-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './wedding-list.component.html',
  styleUrls: ['./wedding-list.component.scss']
})
export class WeddingListComponent implements OnInit {
  weddings: WeddingResponse[] = [];
  loading = true;
  error: string | null = null;

  constructor(private weddingService: WeddingService) {}

  ngOnInit(): void {
    this.loadWeddings();
  }

  private loadWeddings(): void {
    this.weddingService.getOrganizerWeddings().subscribe({
      next: (weddings) => {
        this.weddings = weddings;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load weddings';
        this.loading = false;
        console.error('Error loading weddings:', error);
      }
    });
  }
}
