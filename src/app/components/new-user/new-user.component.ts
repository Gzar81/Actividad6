import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  actualizando = false;


  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
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

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params.id) {
        let id = params.id
        this.actualizando = true;
        this.usersService.getById(id).subscribe(
          (user: User) => {
            this.user = user;
            console.log(this.user) // Esto es lo que tengo en user al cargar Actualizar Usuario
          },
          (error: any) => {
            console.error(error);
          }
        );

      } else {
        this.actualizando = false
      }
    })
  }

  /* ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params.id) {
        this.actualizando = true; // Marcar que se está actualizando un usuario existente
        console.log(params.id)
        this.usersService.getById(params.id).subscribe(
          (user: User) => {
            this.user = user;
            this.miFormulario.patchValue({  // Rellenar el formulario con los datos del usuario
              first_name: this.user.first_name,
              last_name: this.user.last_name,
              email: this.user.email,
              image: this.user.image
            });

          },
          (error: any) => {
            console.error(error);
          }
        );
      }
    });
  } */

  recogerDatosForm() {
    let newUser = this.miFormulario.value;
    console.log(newUser);
    if (this.actualizando) {
      // Actualizar usuario existente
      this.usersService.updateUser(this.user._id).subscribe(
        (data: any) => {
          console.log(data);
          alert(`Usuario ${newUser.first_name} ${newUser.last_name} actualizado correctamente`);
          this.miFormulario.reset();
          // Aquí puedes hacer algo como redirigir a la página de inicio o recargar la lista de usuarios
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      // Crear usuario nuevo
      this.usersService.createNewUser(newUser).subscribe(
        (data: any) => {
          console.log(data);
          alert(`Usuario ${newUser.first_name} ${newUser.last_name} creado correctamente`);
          this.miFormulario.reset();
          // Aquí puedes hacer algo como redirigir a la página de inicio o recargar la lista de usuarios
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }





  /*  recogerDatosForm() { //Ya NO hay que crear el username y el id para cumplir con el interfaz porque van con _id?: username?:
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
   } */

  checkControl(pControlName: string, pError: string): boolean {
    if (this.miFormulario.get(pControlName)?.hasError(pError) && this.miFormulario.get(pControlName)?.touched) {
      return true
    }
    return false
  }



}

