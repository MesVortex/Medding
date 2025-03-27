import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorProfile } from '../../../shared/models/profile.model';
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-admin-vendors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-vendors.component.html'
})
export class AdminVendorsComponent implements OnInit {
  vendors: VendorProfile[] = [];
  loading = true;
  error: string | null = null;
  success: string | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadVendors();
  }

  private loadVendors(): void {
    this.adminService.getAllVendors().subscribe({
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

  verifyVendor(id: number): void {
    this.adminService.verifyVendor(id).subscribe({
      next: () => {
        this.success = 'Vendor verified successfully';
        this.loadVendors(); // Reload the list
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to verify vendor';
      }
    });
  }

  unverifyVendor(id: number): void {
    this.adminService.unverifyVendor(id).subscribe({
      next: () => {
        this.success = 'Vendor unverified successfully';
        this.loadVendors(); // Reload the list
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to unverify vendor';
      }
    });
  }
}
