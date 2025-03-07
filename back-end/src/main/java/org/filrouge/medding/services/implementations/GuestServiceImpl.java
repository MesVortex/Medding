package org.filrouge.medding.services.implementations;

import lombok.RequiredArgsConstructor;
import org.filrouge.medding.dto.requests.GuestRequestDTO;
import org.filrouge.medding.dto.responses.GuestResponseDTO;
import org.filrouge.medding.entities.Guest;
import org.filrouge.medding.entities.Wedding;
import org.filrouge.medding.entities.enums.StatusRSVP;
import org.filrouge.medding.exceptions.ResourceNotFoundException;
import org.filrouge.medding.exceptions.UnauthorizedException;
import org.filrouge.medding.mappers.GuestMapper;
import org.filrouge.medding.repositories.GuestRepository;
import org.filrouge.medding.repositories.WeddingRepository;
import org.filrouge.medding.services.interfaces.EmailService;
import org.filrouge.medding.services.interfaces.GuestService;
import org.filrouge.medding.utils.SecurityUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GuestServiceImpl implements GuestService {
    private final GuestRepository guestRepository;
    private final WeddingRepository weddingRepository;
    private final GuestMapper guestMapper;
    private final SecurityUtils securityUtils;
    private final EmailService emailService;

    @Override
    public GuestResponseDTO createGuest(GuestRequestDTO guestRequestDTO) {
        Long currentUserId = securityUtils.getCurrentUserId();
        Wedding wedding = weddingRepository.findById(guestRequestDTO.getWeddingId())
                .orElseThrow(() -> new ResourceNotFoundException("Wedding not found"));

        if (!wedding.getOrganizer().getId().equals(currentUserId)) {
            throw new UnauthorizedException("You can only add guests to your own weddings");
        }

        Guest guest = guestMapper.toEntity(guestRequestDTO);
        guest.setWedding(wedding);
        Guest savedGuest = guestRepository.save(guest);
        return guestMapper.toDTO(savedGuest);
    }

    @Override
    public List<GuestResponseDTO> getAllGuestsByWeddingId(Long weddingId) {
        Long currentUserId = securityUtils.getCurrentUserId();
        Wedding wedding = weddingRepository.findById(weddingId)
                .orElseThrow(() -> new ResourceNotFoundException("Wedding not found"));

        if (!wedding.getOrganizer().getId().equals(currentUserId)) {
            throw new UnauthorizedException("You can only view guests from your own weddings");
        }

        return guestRepository.findByWeddingId(weddingId).stream()
                .map(guestMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public GuestResponseDTO getGuestById(Long id) {
        Guest guest = guestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Guest not found"));

        if (!guest.getWedding().getOrganizer().getId().equals(securityUtils.getCurrentUserId())) {
            throw new UnauthorizedException("You can only view guests from your own weddings");
        }

        return guestMapper.toDTO(guest);
    }

    @Override
    public GuestResponseDTO updateGuest(Long id, GuestRequestDTO guestRequestDTO) {
        Guest guest = guestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Guest not found"));

        if (!guest.getWedding().getOrganizer().getId().equals(securityUtils.getCurrentUserId())) {
            throw new UnauthorizedException("You can only update guests from your own weddings");
        }

        guest.setName(guestRequestDTO.getName());
        guest.setEmail(guestRequestDTO.getEmail());
        guest.setRsvpStatus(guestRequestDTO.getRsvpStatus());

        Guest updatedGuest = guestRepository.save(guest);
        return guestMapper.toDTO(updatedGuest);
    }

    @Override
    public void deleteGuest(Long id) {
        Guest guest = guestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Guest not found"));

        if (!guest.getWedding().getOrganizer().getId().equals(securityUtils.getCurrentUserId())) {
            throw new UnauthorizedException("You can only delete guests from your own weddings");
        }

        guestRepository.deleteById(id);
    }

    @Override
    public GuestResponseDTO sendInvitation(Long guestId) {
        Guest guest = guestRepository.findById(guestId)
                .orElseThrow(() -> new ResourceNotFoundException("Guest not found"));

        if (!guest.getWedding().getOrganizer().getId().equals(securityUtils.getCurrentUserId())) {
            throw new UnauthorizedException("You can only send invitations for your own weddings");
        }

        String token = generateInvitationToken();
        guest.setInvitationToken(token);
        guest.setRsvpStatus(StatusRSVP.PENDING);

        String invitationLink = createInvitationLink(token);
        emailService.sendInvitationEmail(guest.getEmail(), invitationLink, guest.getWedding());

        Guest savedGuest = guestRepository.save(guest);
        return guestMapper.toDTO(savedGuest);
    }

    @Override
    public GuestResponseDTO updateRsvpStatus(String token, StatusRSVP status) {
        Guest guest = guestRepository.findByInvitationToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid invitation token"));

        guest.setRsvpStatus(status);
        Guest updatedGuest = guestRepository.save(guest);
        return guestMapper.toDTO(updatedGuest);
    }

    private String generateInvitationToken() {
        return UUID.randomUUID().toString();
    }

    private String createInvitationLink(String token) {
        return String.format("http://localhost:4200/api/guests/rsvp/%s", token);
    }
}