import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup,FormControl,FormArray } from '@angular/forms';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { noSpaceValidator } from './Validators/noSpaceValidator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // first i will make a form group variable 
  reactiveForm !: FormGroup;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.reactiveForm = new FormGroup({
     firstName: new FormControl(null,[Validators.required,noSpaceValidator]),
     lastName: new FormControl(null, Validators.required),
     email:new FormControl(null, [Validators.required,Validators.email]),
     userName: new FormControl(null),
     date: new FormControl(null),
     gender: new FormControl("male"),
     address: new FormGroup({
      streetAddress: new FormControl(null),
      country: new FormControl("country"),
      city: new FormControl(null),
      region: new FormControl(null),
      postalCode: new FormControl(null)
     }),
     skills: new FormArray([]),
     experience: new FormArray([])
    });
    //  skills: new FormArray([
    //   // new FormControl(),
    //   // new FormControl()
    //  ]),
    //  experience: new FormArray([
    //   new FormGroup({
    //     company: new FormControl(null),
    //     position: new FormControl(null),
    //     totalExp: new FormControl(null),
    //     start: new FormControl(null),
    //     end: new FormControl(null),
    //   }),
    //   new FormGroup({
    //     company: new FormControl(null),
    //     position: new FormControl(null),
    //     totalExp: new FormControl(null),
    //     start: new FormControl(null),
    //     end: new FormControl(null),
    //   })
    //  ])
    // });
    
  }
  get f(){
    return this.reactiveForm.controls
  }

  AddSkill(){
  (<FormArray>this.reactiveForm.get('skills')).
  push(new FormControl(null,Validators.required))
  }

  DeleteSkill(index:number){
    (<FormArray>this.reactiveForm.get('skills')).removeAt(index)
  }

  AddExperience(){
    let frmGroup = new FormGroup({
      company: new FormControl(null,Validators.required),
      position: new FormControl(null,Validators.required),
      totalExp: new FormControl(null),
      start: new FormControl(null),
      end: new FormControl(null),
    });
    (<FormArray>this.reactiveForm.get('experience')).push(frmGroup);
  }

  DeleteExperince(index:number){
    (<FormArray>this.reactiveForm.get('experience')).removeAt(index)
  }

  onSubmit(){
    // this.isSubmitted=true
    console.log(this.reactiveForm['controls']['experience']['controls'][0]['controls']['company'].value)
  }
  isSubmitted :boolean = false;

}


