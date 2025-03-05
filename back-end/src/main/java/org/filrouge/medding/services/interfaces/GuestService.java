package org.filrouge.medding.services.interfaces;

import org.filrouge.medding.dto.requests.GuestRequestDTO;
import org.filrouge.medding.dto.responses.GuestResponseDTO;
import java.util.List;

public interface GuestService {
    GuestResponseDTO createGuest(GuestRequestDTO guestRequestDTO);
    List<GuestResponseDTO> getAllGuestsByWeddingId(Long weddingId);
    GuestResponseDTO getGuestById(Long id);
    GuestResponseDTO updateGuest(Long id, GuestRequestDTO guestRequestDTO);
    void deleteGuest(Long id);
}
