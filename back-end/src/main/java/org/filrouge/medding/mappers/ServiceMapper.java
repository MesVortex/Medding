package org.filrouge.medding.mappers;

import org.filrouge.medding.dto.requests.ServiceRequestDTO;
import org.filrouge.medding.dto.responses.ServiceResponseDTO;
import org.filrouge.medding.entities.Service;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ServiceMapper {
    ServiceResponseDTO toDTO(Service service);
    Service toEntity(ServiceRequestDTO serviceRequestDTO);
}