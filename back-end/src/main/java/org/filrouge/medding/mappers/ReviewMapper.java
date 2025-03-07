package org.filrouge.medding.mappers;

import org.filrouge.medding.dto.responses.ReviewResponseDTO;
import org.filrouge.medding.entities.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    @Mapping(source = "vendor.id", target = "vendorId")
    @Mapping(source = "organizer.id", target = "organizerId")
    @Mapping(source = "organizer.username", target = "organizerName")
    ReviewResponseDTO toDTO(Review review);
}
