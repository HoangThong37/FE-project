package net.test.service.impl;

import net.test.converter.EmployeeConverter;
import net.test.dto.EmployeeDTO;
import net.test.dto.EmployeesDTO;
import net.test.entity.EmployeeEntity;
import net.test.enums.Status;
import net.test.repository.EmployeeRepository;
import net.test.service.IEmployeeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
public class EmployeeService implements IEmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeConverter employeeConverter;


    @Override
    @Transactional
    public EmployeeDTO insert(EmployeeDTO employeeDTO) {
        EmployeeEntity employeeEntity = employeeConverter.convertToEntity(employeeDTO);
        employeeEntity.setStatus(Status.ACTIVE);

        return employeeConverter.convertToDto(employeeRepository.save(employeeEntity));
    }

    @Override
    public EmployeesDTO findAll() {
        List<EmployeeEntity> employeeEntities = employeeRepository.findAll();

        return employeeConverter.convertToDtos(employeeEntities);
    }

    @Override
    @Transactional
    public void delete(long[] ids) {
        for (Long item : ids) {
            EmployeeEntity employeeEntity = employeeRepository.findById(item).get();
            employeeEntity.setStatus(Status.INACTIVE);
            employeeRepository.save(employeeEntity);
        }
    }

    @Override
    @Transactional
    public EmployeeDTO update(EmployeeDTO employeeDTO) {
        if (employeeDTO.getId() != null) {
            EmployeeEntity employeeEntity = employeeRepository.findById(employeeDTO.getId())
                                                              .orElseThrow(() -> new RuntimeException("Employee not found"));
            EmployeeEntity employeeUpdate = employeeConverter.updateEntityFromDTO(employeeEntity, employeeDTO);

            return employeeConverter.convertToDto(employeeRepository.save(employeeUpdate));
        } else {
            throw new RuntimeException("Employee ID is required for update");
        }
    }
}
