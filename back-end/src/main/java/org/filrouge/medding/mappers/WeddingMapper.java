package org.filrouge.medding.mappers;

import org.filrouge.medding.dto.requests.WeddingRequestDTO;
import org.filrouge.medding.dto.responses.WeddingResponseDTO;
import org.filrouge.medding.entities.Wedding;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface WeddingMapper {
    @Mapping(target = "organizerName", expression = "java(wedding.getOrganizer() != null ? wedding.getOrganizer().getUsername() : null)")
    WeddingResponseDTO toDTO(Wedding wedding);

    Wedding toEntity(WeddingRequestDTO weddingRequestDTO);
}
