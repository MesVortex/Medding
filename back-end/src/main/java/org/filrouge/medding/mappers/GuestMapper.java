package org.filrouge.medding.mappers;

import org.filrouge.medding.dto.requests.GuestRequestDTO;
import org.filrouge.medding.dto.responses.GuestResponseDTO;
import org.filrouge.medding.entities.Guest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface GuestMapper {
    @Mapping(target = "weddingId", source = "wedding.id")
    GuestResponseDTO toDTO(Guest guest);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "wedding", ignore = true)
    Guest toEntity(GuestRequestDTO guestRequestDTO);
}
