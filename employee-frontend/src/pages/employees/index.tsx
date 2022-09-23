import type {NextPage} from "next";
import {useEffect, useState} from "react";
import {addEmployee, deleteEmployee, Employee, getAllEmployees} from "../../server/server";
import {Button, Grid, TextField, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Employees: NextPage = () => {

    const [employees, setEmployees] = useState<Employee[]>([{id: 0, firstName: "", lastName: "", description: ""}]);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        getAllEmployees().then(fetchedEmployees => {
            console.log(fetchedEmployees)
            setEmployees(fetchedEmployees)
        })
    }, []);

    const addNewEmployee = () => {
        if (!firstName || !lastName || !description) return;

        addEmployee(firstName, lastName, description)
            .then(response =>
                setEmployees(prevEmployees => {
                    prevEmployees.push(response);
                    return prevEmployees;
                })).then(() => {
            getAllEmployees().then(fetchedEmployees => {
                console.log(fetchedEmployees)
                setEmployees(fetchedEmployees)
            })
            setFirstName("")
            setLastName("")
            setDescription("")
        })
    }

    const removeEmployee = (id: number) => {
        deleteEmployee(id)
            .then(accepted =>
                accepted && setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== id))
            )
            .then(() => {
                getAllEmployees().then(fetchedEmployees => {
                    console.log(fetchedEmployees)
                    setEmployees(fetchedEmployees)
                })
            })
    }

    return (
        <>
            <Typography variant={'h3'} mb={2}>{employees.length} Employees:</Typography>
            {employees.map(employee => <EmployeeView employee={employee} removeEmployee={removeEmployee}/>)}


            <Grid container spacing={2} sx={{marginTop: 5}}>
                <Grid item>
                    <TextField label={'First Name'} value={firstName}
                               onChange={(option) => setFirstName(option.target.value)}/>
                </Grid>
                <Grid item>
                    <TextField label={'Last Name'} value={lastName}
                               onChange={(option) => setLastName(option.target.value)}/>
                </Grid>
                <Grid item>
                    <TextField label={'Description'} value={description}
                               onChange={(option) => setDescription(option.target.value)}/>
                </Grid>
            </Grid>
            <Button variant={'contained'} sx={{marginTop: 3}} onClick={addNewEmployee}>Add Employee</Button>
        </>
    )
}

interface EmployeeViewProps {
    employee: Employee
    removeEmployee: (id: number) => void
}

const EmployeeView = (props: EmployeeViewProps) => {
    const employee = props.employee
    return (
        <div key={employee.id}>
            <Button style={{borderRadius: 30}} size={'small'} onClick={() => props.removeEmployee(employee.id)}>
                <CloseIcon style={{color: 'red'}}/>
            </Button>
            <strong>{employee.firstName} {employee.lastName}: </strong>
            {employee.description}
            <br/><br/>
        </div>
    )
}
export default Employees;