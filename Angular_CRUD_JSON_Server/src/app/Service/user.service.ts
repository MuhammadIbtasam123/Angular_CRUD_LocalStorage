import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class UserService{
  private BaseURL = 'http://localhost:3000'
  constructor( private http:HttpClient){}

  // definfng the getter methods

  getStudents(): Observable<any>{
    return this.http.get<any[]>( `${this.BaseURL}/students`)
  }

  createStudent(student :any): Observable<any>{
    student.id = student.id.toString();
    return this.http.post(`${this.BaseURL}/students`, student)
  }

  deleteStudent(id:Number): Observable<any>{
    return this.http.delete<any>(`${this.BaseURL}/students/${id.toString()}`);
  }

  updateStudent(student:any, id:Number): Observable<any>{
    return this.http.patch<any>(`${this.BaseURL}/students/${id.toString()}`,student);
  }
}
