export interface DashboardStats {
  totalUsers: number;
  totalVendors: number;
  pendingVendors: number;
  verifiedVendors: number;
  totalOrganizers: number;
  usersByRole: Record<string, number>;
  vendorsByLocation: Record<string, number>;
}

