package net.test.service;

import net.test.dto.EmployeeDTO;
import net.test.dto.EmployeesDTO;

import java.util.List;

public interface IEmployeeService {

    EmployeeDTO insert(EmployeeDTO employeeDTO);
    EmployeeDTO update(EmployeeDTO employeeDTO);
    void delete(long[] ids);
    EmployeesDTO findAll();

}
