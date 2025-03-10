package org.filrouge.medding.dto.responses;

import lombok.*;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDTO {
    private long totalUsers;
    private long totalVendors;
    private long pendingVendors;
    private long verifiedVendors;
    private long totalOrganizers;
    private Map<String, Long> usersByRole;
    private Map<String, Long> vendorsByLocation;
}
