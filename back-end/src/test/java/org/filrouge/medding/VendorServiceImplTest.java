package org.filrouge.medding;

import org.filrouge.medding.dto.responses.VendorProfileDTO;
import org.filrouge.medding.entities.Vendor;
import org.filrouge.medding.exceptions.ResourceNotFoundException;
import org.filrouge.medding.mappers.UserMapper;
import org.filrouge.medding.repositories.VendorRepository;
import org.filrouge.medding.services.implementations.VendorServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VendorServiceImplTest {

    @Mock
    private VendorRepository vendorRepository;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private VendorServiceImpl vendorService;

    private Vendor testVendor;
    private VendorProfileDTO testVendorDTO;

    @BeforeEach
    void setUp() {
        testVendor = new Vendor();
        testVendor.setId(1L);
        testVendor.setUsername("TestVendor");
        testVendor.setEmail("test@vendor.com");
        testVendor.setVerified(true);
        testVendor.setLocation("Test Location");
        testVendor.setNumber("+1234567890");

        testVendorDTO = new VendorProfileDTO();
        testVendorDTO.setId(1L);
        testVendorDTO.setUsername("TestVendor");
        testVendorDTO.setEmail("test@vendor.com");
        testVendorDTO.setVerified(true);
        testVendorDTO.setLocation("Test Location");
        testVendorDTO.setNumber("+1234567890");
    }

    @Test
    @DisplayName("Should get all vendors successfully")
    void getAllVendors_ShouldReturnListOfVendors() {
        when(vendorRepository.findAll()).thenReturn(Arrays.asList(testVendor));
        when(userMapper.vendorToVendorProfileDTO(any(Vendor.class))).thenReturn(testVendorDTO);


        List<VendorProfileDTO> result = vendorService.getAllVendors();

        assertThat(result).isNotEmpty();
        assertThat(result.get(0).getUsername()).isEqualTo("TestVendor");
        verify(vendorRepository).findAll();
    }

    @Test
    @DisplayName("Should get pending vendors successfully")
    void getPendingVendors_ShouldReturnListOfUnverifiedVendors() {
        testVendor.setVerified(false);
        when(vendorRepository.findByVerifiedFalse()).thenReturn(Arrays.asList(testVendor));
        when(userMapper.vendorToVendorProfileDTO(any(Vendor.class))).thenReturn(testVendorDTO);


        List<VendorProfileDTO> result = vendorService.getPendingVendors();

        assertThat(result).isNotEmpty();
        verify(vendorRepository).findByVerifiedFalse();
    }

    @Test
    @DisplayName("Should verify vendor successfully")
    void verifyVendor_WithValidId_ShouldUpdateVerificationStatus() {
        when(vendorRepository.findById(1L)).thenReturn(Optional.of(testVendor));
        when(vendorRepository.save(any(Vendor.class))).thenReturn(testVendor);
        when(userMapper.vendorToVendorProfileDTO(any(Vendor.class))).thenReturn(testVendorDTO);


        VendorProfileDTO result = vendorService.verifyVendor(1L);

        assertThat(result.isVerified()).isTrue();
        verify(vendorRepository).save(any(Vendor.class));
    }

    @Test
    @DisplayName("Should unverify vendor successfully")
    void unverifyVendor_WithValidId_ShouldUpdateVerificationStatus() {
        when(vendorRepository.findById(1L)).thenReturn(Optional.of(testVendor));
        when(vendorRepository.save(any(Vendor.class))).thenReturn(testVendor);
        when(userMapper.vendorToVendorProfileDTO(any(Vendor.class))).thenReturn(testVendorDTO);


        VendorProfileDTO result = vendorService.unverifyVendor(1L);

        assertThat(result).isNotNull();
        verify(vendorRepository).save(any(Vendor.class));
    }

    @Test
    @DisplayName("Should throw exception when vendor not found during verification")
    void verifyVendor_WithInvalidId_ShouldThrowException() {
        when(vendorRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> vendorService.verifyVendor(99L));
    }

    @Test
    @DisplayName("Should delete vendor successfully")
    void deleteVendor_WithValidId_ShouldDeleteVendor() {
        when(vendorRepository.existsById(1L)).thenReturn(true);


        vendorService.deleteVendor(1L);

        verify(vendorRepository).deleteById(1L);
    }

    @Test
    @DisplayName("Should throw exception when trying to delete non-existent vendor")
    void deleteVendor_WithInvalidId_ShouldThrowException() {
        when(vendorRepository.existsById(99L)).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> vendorService.deleteVendor(99L));
    }
}