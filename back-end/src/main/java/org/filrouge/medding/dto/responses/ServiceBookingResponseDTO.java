package org.filrouge.medding.dto.responses;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ServiceBookingResponseDTO {
    private Long id;
    private Long serviceId;
    private Long weddingId;
    private String serviceName;
    private String vendorName;
    private LocalDateTime bookedAt;
    private String status;
}
