export interface Employee {
    id: number,
    firstName: string,
    lastName: string,
    description: string
}

export async function getAllEmployees(): Promise<[Employee]> {
    const response = await fetch('http://localhost:8080/api/employees');
    return response.status === 200 ? await response.json() : [];
}

export async function getEmployee(id: number): Promise<Employee> {
    const response = await fetch(`api/employees/${id}`);
    return await response.json();
}

export async function addEmployee(firstName: string, lastName: string, description: string): Promise<Employee> {
    const response = await fetch('http://localhost:8080/api/employees', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({firstName: firstName, lastName: lastName, description: description})
    });
    return await response.json();
}

export async function deleteEmployee(id: number): Promise<boolean> {
    const response = await fetch(`http://localhost:8080/api/employees/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    });
    return response.status === 200;
}