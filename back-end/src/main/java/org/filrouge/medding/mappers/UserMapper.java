package org.filrouge.medding.mappers;


import org.filrouge.medding.dto.requests.OrganizerRequestDTO;
import org.filrouge.medding.dto.requests.UserRequestDTO;
import org.filrouge.medding.dto.requests.VendorRequestDTO;
import org.filrouge.medding.dto.responses.*;
import org.filrouge.medding.entities.Organizer;
import org.filrouge.medding.entities.Service;
import org.filrouge.medding.entities.User;
import org.filrouge.medding.entities.Vendor;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserResponseDTO userToUserResponseDTO(User user);
    OrganizerResponseDTO organizerToOrganizerResponseDTO(Organizer organizer);
    VendorResponseDTO vendorToVendorResponseDTO(Vendor vendor);

    User userRequestDTOToUser(UserRequestDTO userRequestDTO);
    Organizer organizerRequestDTOToOrganizer(OrganizerRequestDTO organizerRequestDTO);
    Vendor vendorRequestDTOToVendor(VendorRequestDTO vendorRequestDTO);

    VendorProfileDTO vendorToVendorProfileDTO(Vendor vendor);
    ServiceDTO serviceToServiceDTO(Service service);
}
