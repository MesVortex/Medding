import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {VendorProfile} from "../../models/profile.model";
import {ProfileService} from "../../services/profile.service";
import {VendorService} from "../../services/vendor.service";

@Component({
  selector: 'app-vendor-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vendor-list.component.html'
})
export class VendorListComponent implements OnInit {
  vendors: VendorProfile[] = [];
  loading = true;
  error: string | null = null;

  constructor(private vendorService: VendorService) {}

  ngOnInit(): void {
    this.loadVendors();
  }

  private loadVendors(): void {
    this.vendorService.getAllVendors().subscribe({
      next: (vendors) => {
        this.vendors = vendors;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load vendors';
        this.loading = false;
        console.error('Error loading vendors:', error);
      }
    });
  }
}
