package com.example.employeespring.payroll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Temporary file just to load data on run since there is no database storage yet
 */
@Component
public class DatabaseLoader implements CommandLineRunner {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public DatabaseLoader(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public void run(String... args)  {
        this.employeeRepository.save(new Employee("Aegon", "Targaryen", "Conqueror"));
    }
}
