package net.test.converter;

import net.test.dto.EmployeeDTO;
import net.test.dto.EmployeesDTO;
import net.test.entity.EmployeeEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class EmployeeConverter {

    @Autowired
    private ModelMapper modelMapper;

    public EmployeeDTO convertToDto(EmployeeEntity employeeEntity) {
        EmployeeDTO employeeDTO = modelMapper.map(employeeEntity, EmployeeDTO.class);
        employeeDTO.setId(employeeEntity.getId());
        return employeeDTO;
    }

    public EmployeeEntity convertToEntity (EmployeeDTO employeeDTO){
        EmployeeEntity result = modelMapper.map(employeeDTO, EmployeeEntity.class);
        return result;
    }

    public EmployeesDTO convertToDtos(List<EmployeeEntity> employeeEntities) {
        EmployeesDTO employeesDTO = new EmployeesDTO();

        List<EmployeeDTO> employeeDTOs = employeeEntities.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        employeesDTO.setEmployees(employeeDTOs);
        return employeesDTO;
    }

    public EmployeeEntity updateEntityFromDTO(EmployeeEntity employeeEntity, EmployeeDTO dto) {
        employeeEntity.setName(dto.getName());
        employeeEntity.setBirthDate(dto.getBirthDate());
        employeeEntity.setGender(dto.getGender());
        employeeEntity.setPhone(dto.getPhone());
        employeeEntity.setEmail(dto.getEmail());
        employeeEntity.setAddress(dto.getAddress());
        employeeEntity.setTeam(dto.getTeam());
        return employeeEntity;
    }
}
