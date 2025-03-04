package org.filrouge.medding.dto.responses;

import lombok.Data;
import java.util.List;

@Data
public class VendorProfileDTO {
    private Long id;
    private String username;
    private String email;
    private String location;
    private String number;
    private List<ServiceDTO> services;
}
