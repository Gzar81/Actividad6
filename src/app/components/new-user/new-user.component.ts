import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  miFormulario: FormGroup;
  user: User | any;

  constructor(
    private usersService: UsersService
  ) {
    this.miFormulario = new FormGroup({
      first_name: new FormControl('', [
        Validators.required
      ]),
      last_name: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        )
      ]),
      image: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)
      ]),


    }, [])


  }
  /* arrUsuarios: Usuario[] = []; */



  recogerDatosForm() { //Ya NO hay que crear el username y el id para cumplir con el interfaz porque van con _id?: username?:
    let user = this.miFormulario.value
    this.user = user;
    console.log(user)
    this.usersService.createNewUser(user).subscribe((data: any) => {
      console.log(data);
      alert(`Usuario ${user.first_name} ${user.last_name} creado correctamente`)
      this.miFormulario.reset()
      // Aquí puedes hacer algo como redirigir a la página de inicio o recargar la lista de usuarios
    }, (error: any) => {
      console.log(error);
    });
  }//FALTA AÑADIR EL 

  checkControl(pControlName: string, pError: string): boolean {
    if (this.miFormulario.get(pControlName)?.hasError(pError) && this.miFormulario.get(pControlName)?.touched) {
      return true
    }
    return false
  }



}

