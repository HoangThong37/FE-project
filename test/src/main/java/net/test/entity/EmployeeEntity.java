package net.test.entity;

import lombok.Data;
import net.test.enums.Status;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "employees")
@Data
public class EmployeeEntity extends BaseEntity {

    @Column
    private String name;

    @Column
    private Date birthDate;

    @Column
    private String gender;

    @Column
    private String phone;

    @Column
    private String email;

    @Column
    private String address;

    @Column
    private String team;

    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;

}
