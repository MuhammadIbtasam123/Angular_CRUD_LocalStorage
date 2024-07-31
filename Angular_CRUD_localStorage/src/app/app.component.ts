import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title: String = 'Angular_CRUD_localStorage';
  isDialogBoxOpen: Boolean = false;
  update:Boolean = false;
  htmlElement !: HTMLElement ;
  StudentObj :Student = new Student();
  students: Array<any> = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      age: 20,
      phone: "123-456-7890",
      city: "New York",
      state: "NY",
      zip: "10001",
      address: "123 Main St, New York, NY 10001"
    },
  ];
  StudentList: Array<any> = [] || this.students;


// when first application load , Load data or read from local Storage.
ngOnInit(): void {
    const getData = localStorage.getItem("AngularTODO");
    if( getData){
      this.StudentList = JSON.parse(getData);
      console.log(this.StudentList)
    }
}

  // another way is uinsg viewChild
  // @ViewChild('myModal') modal !: ElementRef | undefined;
  // this.htmlElement = this.modal;


  openModal(){
    // using viewchild - make sure use #template vaiable in HTML to get refernce
    // if(this.modal != null){
    //   // this.modal.nativeElement;
    //   console.log(this.modal.nativeElement.append.className)
    // }


    // one of the way to get the refernce of the DOM elemnt - not recomended directly accessing the dom

    // const element = document.getElementById("myModal")
    // if(element != null){
    //   element.style.display = 'block';
    // }
    this.isDialogBoxOpen = !this.isDialogBoxOpen
  }

  closeModal(){
    this.isDialogBoxOpen = !this.isDialogBoxOpen
    this.update=false;
  }

  SaveStudent(){
    // if there is already data fetch it
    const isLocalStorage = localStorage.getItem("AngularTODO");
    let studentArray = [];
  
    // if data exist in local storage parse it and set id to length + 1
    // else for first data id would set to 1
    if (isLocalStorage) {
      studentArray = JSON.parse(isLocalStorage);
      this.StudentObj.id = studentArray.length + 1;
    } else {
      this.StudentObj.id = 1;
    }
  
    // store new data into student array that contains either no data
    //  or previous data
    studentArray.push(this.StudentObj);
    localStorage.setItem("AngularTODO", JSON.stringify(studentArray));
    this.StudentList = studentArray;
    this.StudentObj = new Student();
  }

  Delete(value: Number) {
    console.log(value);
    const idx = this.StudentList.findIndex(obj => obj.id === value);
  
    if (idx !== -1) {
      console.log("Deleting student with ID:", value);
      this.StudentList.splice(idx, 1);
      localStorage.setItem("AngularTODO", JSON.stringify(this.StudentList));
    }
  }
  

  Update(value: Number){
    this.isDialogBoxOpen = true;
    this.update =true;
    console.log(value)
    const object = this.StudentList.find(obj=> obj.id ===value)
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

    // console.log(this.StudentObj)
  }

  UpdateStudent() {
    console.log(this.StudentObj);
    const isLocalStorageData = localStorage.getItem("AngularTODO");
  
    if (isLocalStorageData) {
      let data = JSON.parse(isLocalStorageData); 
  
      // Find the index of the student to be updated
      const idx = data.findIndex((obj: { id: number }) => obj.id === this.StudentObj.id);
  
      if (idx !== -1) {
        // Update the student object at the found index
        data[idx] = this.StudentObj;
        
        // Save the updated array back to local storage
        localStorage.setItem("AngularTODO", JSON.stringify(data));
        this.StudentList = data;
        this.isDialogBoxOpen=false;
      } else {
        console.log("Student not found");
      }
    } else {
      console.log("No data in local storage");
    }
  }
  

}

export class Student {

  id: Number
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
