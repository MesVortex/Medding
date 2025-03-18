package org.filrouge.medding.mappers;

import org.filrouge.medding.dto.requests.ServiceRequestDTO;
import org.filrouge.medding.dto.responses.ServiceResponseDTO;
import org.filrouge.medding.entities.Service;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ServiceMapper {
    ServiceMapper INSTANCE = Mappers.getMapper(ServiceMapper.class);

    @Mapping(target = "vendorId", source = "vendor.id")
    @Mapping(target = "vendorName", source = "vendor.username")
    ServiceResponseDTO serviceToServiceResponseDTO(Service service);
    Service serviceRequestDTOToService(ServiceRequestDTO serviceRequestDTO);
}