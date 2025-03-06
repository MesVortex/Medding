package org.filrouge.medding.services.implementations;

import lombok.RequiredArgsConstructor;
import org.filrouge.medding.dto.requests.WeddingRequestDTO;
import org.filrouge.medding.dto.responses.WeddingResponseDTO;
import org.filrouge.medding.entities.Organizer;
import org.filrouge.medding.entities.Wedding;
import org.filrouge.medding.exceptions.ResourceNotFoundException;
import org.filrouge.medding.exceptions.UnauthorizedException;
import org.filrouge.medding.mappers.WeddingMapper;
import org.filrouge.medding.repositories.UserRepository;
import org.filrouge.medding.repositories.WeddingRepository;
import org.filrouge.medding.services.interfaces.WeddingService;
import org.filrouge.medding.utils.SecurityUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WeddingServiceImpl implements WeddingService {

    private final WeddingRepository weddingRepository;
    private final UserRepository userRespository;
    private final WeddingMapper weddingMapper;
    private final SecurityUtils securityUtils;

    @Override
    public WeddingResponseDTO createWedding(WeddingRequestDTO weddingRequestDTO) {
        Long currentUserId = securityUtils.getCurrentUserId();

        Organizer organizer = (Organizer) userRespository.findById(currentUserId)
                .orElseThrow(() -> new UnauthorizedException("Only organizers can create weddings"));

        Wedding wedding = weddingMapper.toEntity(weddingRequestDTO);
        wedding.setOrganizer(organizer);

        Wedding savedWedding = weddingRepository.save(wedding);
        return weddingMapper.toDTO(savedWedding);
    }

    @Override
    public List<WeddingResponseDTO> getAllWeddings() {
        return weddingRepository.findAll().stream()
                .map(weddingMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public WeddingResponseDTO getWeddingById(Long id) {
        Wedding wedding = weddingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Wedding not found with id: " + id));
        return weddingMapper.toDTO(wedding);
    }

    @Override
    public List<WeddingResponseDTO> getWeddingsByOrganizerId(Long organizerId) {
        return weddingRepository.findByOrganizerId(organizerId).stream()
                .map(weddingMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public WeddingResponseDTO updateWedding(Long id, WeddingRequestDTO weddingRequestDTO) {
        Long currentUserId = securityUtils.getCurrentUserId();

        Wedding wedding = weddingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Wedding not found with id: " + id));

        if (!wedding.getOrganizer().getId().equals(currentUserId)) {
            throw new UnauthorizedException("You can only update your own weddings");
        }

        wedding.setBride(weddingRequestDTO.getBride());
        wedding.setGroom(weddingRequestDTO.getGroom());
        wedding.setBudget(weddingRequestDTO.getBudget());
        wedding.setDate(weddingRequestDTO.getDate());
        wedding.setLocation(weddingRequestDTO.getLocation());

        Wedding updatedWedding = weddingRepository.save(wedding);
        return weddingMapper.toDTO(updatedWedding);
    }

    @Override
    public void deleteWedding(Long id) {
        Long currentUserId = securityUtils.getCurrentUserId();

        Wedding wedding = weddingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Wedding not found with id: " + id));

        if (!wedding.getOrganizer().getId().equals(currentUserId)) {
            throw new UnauthorizedException("You can only delete your own weddings");
        }

        weddingRepository.deleteById(id);
    }
}
