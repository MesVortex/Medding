package org.filrouge.medding.services.interfaces;

import org.filrouge.medding.dto.requests.WeddingRequestDTO;
import org.filrouge.medding.dto.responses.WeddingResponseDTO;
import java.util.List;

public interface WeddingService {
    WeddingResponseDTO createWedding(WeddingRequestDTO weddingRequestDTO);
    List<WeddingResponseDTO> getAllWeddings();
//    WeddingResponseDTO getWeddingById(Long id);
    List<WeddingResponseDTO> getWeddingsByOrganizerId(Long organizerId);
    WeddingResponseDTO updateWedding(Long id, WeddingRequestDTO weddingRequestDTO);
    void deleteWedding(Long id);
    List<WeddingResponseDTO> getAuthenticatedOrganizerWeddings();
    WeddingResponseDTO getWeddingWithServices(Long id);
}
