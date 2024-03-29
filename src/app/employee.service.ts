import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { EmployeePage } from './employee-page';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseURL = "http://localhost:8080/api/v1/employees";

  constructor(private httpClient: HttpClient) { }

  getEmployeesList(page: number = 0, size: number = 5): Observable<EmployeePage> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.httpClient.get<EmployeePage>(this.baseURL, { params });
  }
  createEmployee (employee: Employee): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, employee);
  }
  
  getEmployeeById(id: number): Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, employee);
  }

  getEmployeePhoto(id: number): Observable<Blob> {
    // Ajoutez une nouvelle méthode pour récupérer la photo de l'employé
    return this.httpClient.get(`${this.baseURL}/${id}/photo`, { responseType: 'blob' });
  }

  deleteEmployee(id: number): Observable<Object> {
    return new Observable((observer) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.httpClient.delete(`${this.baseURL}/${id}`).subscribe(
            (response) => {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
              });
              observer.next(response);
              observer.complete();
            },
            (error) => {
              // Handle error
              observer.error(error);
            }
          );
        } else {
          observer.complete();
        }
      });
    });
  }
}