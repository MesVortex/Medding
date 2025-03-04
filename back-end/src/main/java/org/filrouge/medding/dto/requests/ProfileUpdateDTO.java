package org.filrouge.medding.dto.requests;

import lombok.Data;

@Data
public class ProfileUpdateDTO {
    private String username;
    private String email;
    private String location;
    private String number;
}
