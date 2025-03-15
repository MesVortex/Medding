package org.filrouge.medding.mappers;


import org.filrouge.medding.dto.requests.OrganizerRequestDTO;
import org.filrouge.medding.dto.requests.ProfileUpdateDTO;
import org.filrouge.medding.dto.requests.UserRequestDTO;
import org.filrouge.medding.dto.requests.VendorRequestDTO;
import org.filrouge.medding.dto.responses.*;
import org.filrouge.medding.entities.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
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
    @Mapping(target = "vendorName", expression = "java(service.getVendor() != null ? service.getVendor().getUsername() : null)")
    ServiceDTO serviceToServiceDTO(Service service);

    Admin adminRequestDTOToAdmin(UserRequestDTO userRequestDTO);
    UserResponseDTO adminToUserResponseDTO(Admin admin);

    void updateUserFromDTO(ProfileUpdateDTO dto, @MappingTarget User user);
    void updateVendorFromDTO(ProfileUpdateDTO dto, @MappingTarget Vendor vendor);
}
