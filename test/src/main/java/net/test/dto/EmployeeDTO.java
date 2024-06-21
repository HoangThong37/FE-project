package net.test.dto;

import lombok.Data;

import java.util.Date;

@Data
public class EmployeeDTO {

    private Long id;

    private String name;

    private Date birthDate;

    private String gender;

    private String phone;

    private String email;

    private String address;

    private String team;
}
