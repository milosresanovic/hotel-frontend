import { Component } from '@angular/core';
import { MatButtonModule} from "@angular/material/button";
import { MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  form: FormGroup;

  fullName: string = "Lmao";

  alertSubmit():void{
    alert("Your message is sent!");
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      fullName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
      message: new FormControl('', [Validators.required, Validators.maxLength(500)])
    })
  }
}
