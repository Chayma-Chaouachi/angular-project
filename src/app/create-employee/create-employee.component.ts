import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee : Employee = new Employee();
  
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.employee.photo = file; // Ajoutez la propriété "photo" à votre objet employee
}
  constructor(private employeeeService: EmployeeService, private router: Router){}

  saveEmployee(){
    this.employeeeService.createEmployee(this.employee).subscribe(data =>{
      console.log(data);
      this.goToEmployeeList();
    },
    error => console.log(error));
  }
  goToEmployeeList(){
    this.router.navigate(['/employees'])
  }
  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.employee);
    this.saveEmployee();
  }

}
