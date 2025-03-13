package org.filrouge.medding.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
    private int status;
    private String message;
    private LocalDateTime timestamp;

    public ErrorResponse(String error, String message) {
        this.status = HttpStatus.UNAUTHORIZED.value();
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }
}
