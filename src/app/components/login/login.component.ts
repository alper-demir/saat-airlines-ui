import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  frm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.frm = formBuilder.group({
      email: [""],
      password: [""],
    })

    this.frm.valueChanges.subscribe({
      next: (data) => {
        console.log(data);
      }
    })
  }



  async onSubmit() {
    const { email, password } = this.frm.value;
    const login = await axios.post("http://localhost:8080/api/users/login", {
      email,
      password
    })
    console.log(login.data == true ? "Giriş başarılı" : "Giriş başarısız");
  }
}
