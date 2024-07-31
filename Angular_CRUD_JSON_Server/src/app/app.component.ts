import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './Service/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  StudentList: Array<any> = [];
  StudentObj: Student = new Student();
  isDialogBoxOpen:Boolean = false;
  forEdit:Boolean = false;
  IDForEdit:number = 0;

  //changin the dom element property using view child
  @ViewChild('myModal', { static: false }) modal!: ElementRef;

  constructor( private userService:UserService){}

  ngOnInit(): void {
      this.loadStudentsFromDB();
  }

  loadStudentsFromDB(){
    this.userService.getStudents().subscribe((data)=>{
      this.StudentList = data
    })
  }

  AddStudentToDB(){
    this.StudentObj.id = this.StudentList.length + 1;
    this.userService.createStudent(this.StudentObj).subscribe(()=>{
      this.loadStudentsFromDB();
    })
    const modalElement = this.modal.nativeElement;
    modalElement.style.display = 'none';
  }

  DeleteStudentToDB(value: number) {
    console.log(value);
    this.userService.deleteStudent(value + 1).subscribe(() => {
      this.loadStudentsFromDB();
    });
  }

  createStudent(){
    this.isDialogBoxOpen = true;
    const modalElement = this.modal.nativeElement;
    modalElement.style.display = 'block';
    
  }



  UpdateStudent(value:number){
    // console.log(value);
    // console.log(this.StudentList.find(obj => obj.id == value))
    const modalElement = this.modal.nativeElement;
    modalElement.style.display = 'block';
    this.forEdit = true;
    const object = this.StudentList.find(obj=> obj.id == value +1)
    this.IDForEdit = object.id;
    console.log(object)
    this.StudentObj.id = object.id;
    this.StudentObj.name = object.name;
    this.StudentObj.email = object.email;
    this.StudentObj.age = object.age;
    this.StudentObj.phone = object.phone;
    this.StudentObj.city = object.city;
    this.StudentObj.state = object.state;
    this.StudentObj.zip = object.zip;
    this.StudentObj.address = object.address;
  }
  UpdateStudentDataToDB(){

    this.userService.updateStudent(this.StudentObj,this.IDForEdit).subscribe(()=>{
      this.loadStudentsFromDB();
      this.closeDialogBox();
    })
  }

  closeDialogBox(){
    this.isDialogBoxOpen = true;
    const modalElement = this.modal.nativeElement;
    modalElement.style.display = 'none';
  }
}



export class Student {

  id: number
  name: String
  email: String
  age: String
  phone:String
  city: String
  state:String
  zip: String
  address: String

  constructor(){
    this.id = 0;
    this.name = '';
    this.email = '';
    this.age = '';
    this.phone = '';
    this.city = "";
    this.state = "";
    this.zip = "";
    this.address = "";

  }
}
