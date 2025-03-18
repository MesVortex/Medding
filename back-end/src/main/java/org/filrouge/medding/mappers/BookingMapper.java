package org.filrouge.medding.mappers;

import org.filrouge.medding.dto.responses.ServiceBookingResponseDTO;
import org.filrouge.medding.entities.ServiceBooking;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface BookingMapper {
    BookingMapper INSTANCE = Mappers.getMapper(BookingMapper.class);

    @Mapping(target = "serviceId", source = "service.id")
    @Mapping(target = "weddingId", source = "wedding.id")
    @Mapping(target = "serviceName", source = "service.title")
    @Mapping(target = "vendorName", source = "service.vendor.username")
    ServiceBookingResponseDTO bookingToBookingResponseDTO(ServiceBooking booking);
}
