import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  miFormulario: FormGroup;

  constructor() {
    this.miFormulario = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      apellidos: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        )
      ]),
      url: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)
      ]),


    }, [])


  }
  /* arrUsuarios: Usuario[] = []; */



  createNewUser() { }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.miFormulario.get(pControlName)?.hasError(pError) && this.miFormulario.get(pControlName)?.touched) {
      return true
    }
    return false
  }



}

