package net.test.controller;

import net.test.dto.EmployeeDTO;
import net.test.dto.EmployeesDTO;
import net.test.service.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin("*")
public class EmployeeController {

	@Autowired
	private IEmployeeService employeeService;

	@PostMapping
	public ResponseEntity<EmployeeDTO> createEmployees(@RequestBody EmployeeDTO employeeDTO){
		return ResponseEntity.ok(employeeService.insert(employeeDTO));
	}

	@PutMapping
	public EmployeeDTO updateEmployees(@RequestBody(required = false) EmployeeDTO employeeDTO){
		return employeeService.update(employeeDTO);
	}


	@GetMapping
	public ResponseEntity<EmployeesDTO> getAllEmployees() {
		EmployeesDTO employees = employeeService.findAll();
		return ResponseEntity.ok(employees);
	}

	@DeleteMapping
	public ResponseEntity<Void> deleteEmployee(@RequestBody long[] idList) {
		if (idList.length > 0) employeeService.delete(idList);

		return ResponseEntity.noContent().build();
	}
}
