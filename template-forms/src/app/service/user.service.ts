import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = 'http://localhost:3000/users'
  constructor(private http:HttpClient) { }

  // deifne all the https request here to make crud operations

  getUserDeatils(){
    return this.http.get<any>(this.API_URL)
  }
  createUser(form:any){
    console.log(form)
    return this.http.post<any>(this.API_URL,form)
  }

  getUserById(id:string){
    return this.http.get<any>(`${this.API_URL}/${id}`)
  }
  updateUser(id:string,form:any){
    return this.http.patch<any>(`${this.API_URL}/${id}`,form)
  }

  DeleteUserById(id:string){
    return this.http.delete<any>(`${this.API_URL}/${id}`)
  }
}
