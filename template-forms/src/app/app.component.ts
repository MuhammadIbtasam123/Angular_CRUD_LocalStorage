import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { UserPipePipe } from './pipes/user-pipe.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule,UserPipePipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  userDetails= <any>[];
  constructor(private userService:UserService){}

  title = 'template-forms';
  FormObj: FormData = new FormData();
  updateButton:boolean = false;
  @ViewChild('signupForm') form !:NgForm;

  GenderArray: Array<Object> = [
    { id: 'check-male', gender: 'male', display: 'Male' },
    { id: 'check-female', gender: 'female', display: 'Female' },
    { id: 'check-other', gender: 'other', display: 'Prefer not to say' }
  ];

  OnSubmission() {
    console.log(this.form)
    this.userService.createUser(this.FormObj).subscribe(response => {
      console.log('User created successfully:', response);
      this.loadUserData(); 
    });
    // this.loadUserData();
  }

  generateUsername() {
    let year = new Date(this.FormObj.dob).getFullYear();
    this.FormObj.userName =JSON.parse(JSON.stringify(`${this.FormObj.firstName.slice(0,3)}${this.FormObj.lastName.slice(0,3)}${year}`)) 

    // ISsues
    // you can't do this its read only - update in console but not in input box
    // this.form.value.userName = `${this.FormObj.firstName.slice(0,3)}${this.FormObj.lastName.slice(0,3)}${year}`;
    // this.form.form.value.userName = `${this.FormObj.firstName.slice(0,3)}${this.FormObj.lastName.slice(0,3)}${year}`;

    // TS2540: Cannot assign to 'value' because it is a read-only property.
    // this.form.controls['userName'].value = `${this.FormObj.firstName.slice(0,3)}${this.FormObj.lastName.slice(0,3)}${year}`;
       // to do this we use -- set value and patch value
   // change the value object and follow the structure for setValue 
   // for patch value, provide only the value that needed to update.

    // this.form.setValue({
    //   firstname: this.form.value.firstname,
    //   lastname: this.form.value.lastname,
    //   email: this.form.value.email,
    //   phone: this.form.value.phone,
    //   dob: this.form.value.dob,
    //   gender: this.form.value.gender,
    //   username: username,
    //   address: {
    //     street1: this.form.value.address.street1,
    //     street2: this.form.value.address.street2,
    //     country: this.form.value.address.country,
    //     city: this.form.value.address.city,
    //     region: this.form.value.address.region,
    //     postal: this.form.value.address.postal
    //   }
    // })

    // this.form refernce current form in controller -> form in ngForm -> value
    // this.form.form.patchValue({
    //   userName: this.FormObj.userName,
    // })
  }  
  ngOnInit() {
    this.loadUserData();
  }

  loadUserData(){
    this.userService.getUserDeatils().subscribe((data)=>{
      this.userDetails = data
    })
    console.log(this.userDetails)
  }

  UpdateFormData(id:string){
    this.updateButton = true;
    this.userService.getUserById(id).subscribe(
      (data)=>{
        this.FormObj = {...data}
      }
    )
  }

  UpdateUser(id:string){
    this.userService.updateUser(id,this.FormObj).subscribe((res)=>{
      console.log(res)

    });
  }

  DeleteUser(id:string){
    this.userService.DeleteUserById(id).subscribe((res)=>{
      this.form.reset()
      this.loadUserData();
    });

  }
}

export class FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  dob: string;
  gender: string;
  userName: string;
  address: {
    street1: string;
    street2: string;
    country: string;
    city: string;
    region: string;
  };

  constructor(
    firstName: string = '',
    lastName: string = '',
    email: string = '',
    phoneNo: string = '',
    dob: string = '',
    gender: string = 'male',
    userName: string = '',
    street1: string = '',
    street2: string = '',
    country: string = '',
    city: string = '',
    region: string = '',
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNo = phoneNo;
    this.dob = dob;
    this.gender = gender;
    this.userName = userName;
    this.address = {
      street1: street1,
      street2: street2,
      country: country,
      city: city,
      region: region,
    };
  }
}
