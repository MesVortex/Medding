import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../services/statistics.service';
import { DashboardStats } from "../models/statistics.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  loading = true;
  error: string | null = null;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  private loadStats(): void {
    this.statisticsService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load dashboard statistics';
        this.loading = false;
        console.error('Error loading stats:', error);
      }
    });
  }

  getLocationEntries(): [string, number][] {
    return Object.entries(this.stats?.vendorsByLocation || {});
  }
}
