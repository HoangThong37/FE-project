package net.test.dto;

import lombok.Data;

import java.util.List;

@Data
public class EmployeesDTO {
    List<EmployeeDTO> employees;
}
