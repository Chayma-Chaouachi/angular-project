import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
   employees?: Employee[];
   currentPage: number = 0;  // Page actuelle
   pageSize: number = 5;     // Taille de la page
    

  constructor(private employeeService: EmployeeService, private router: Router){}
  ngOnInit(): void {
    this.getEmployees();
  }
  private getEmployees(){
    this.employeeService.getEmployeesList(this.currentPage, this.pageSize).subscribe(
      data => {
        this.employees = data.content;  // "content" est la propriété où se trouvent les données dans la réponse paginée
      });
  }
  viewEmployeePhoto(employeeId: number): void {
    this.employeeService.getEmployeePhoto(employeeId)
      .subscribe(photoBlob => {
        // Utilisez la blob pour afficher la photo, par exemple, en l'assignant à une variable d'image
        const imageUrl = URL.createObjectURL(photoBlob);
        // Affichez l'image dans une fenêtre modale ou une boîte de dialogue ici
        // Vous pouvez également utiliser une bibliothèque telle que ngx-bootstrap/modal ou ng-bootstrap/modal
        // Ou créez votre propre fenêtre modale HTML/CSS personnalisée
      }, error => {
        console.error('Erreur lors de la récupération de la photo de l\'employé', error);
        // Gérez l'erreur ici
      });
}

  getNextPage() {
    this.currentPage++;
    this.getEmployees();
  }

  getPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getEmployees();
    }
  }

  employeeDetails(id: number){
    this.router.navigate(['employee-details', id]);
  }

  updateEmployee(id: number){
    this.router.navigate(['update-employee', id]);

  }

  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe( data => {
      console.log(data);
      this.getEmployees();
    })

  }

}
