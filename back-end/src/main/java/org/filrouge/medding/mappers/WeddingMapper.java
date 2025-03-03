package org.filrouge.medding.mappers;

import org.filrouge.medding.dto.requests.WeddingRequestDTO;
import org.filrouge.medding.dto.responses.WeddingResponseDTO;
import org.filrouge.medding.entities.Wedding;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface WeddingMapper {
    WeddingResponseDTO toDTO(Wedding wedding);
    Wedding toEntity(WeddingRequestDTO weddingRequestDTO);
}
