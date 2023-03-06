import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  actualizando: boolean = false;
  createdUser: boolean = false;
  creatingUserError: boolean = false;
  errorCreatingMessage: string = "";
  updatedUser: boolean = false;
  updatingUserError: boolean = false;
  errorUpdatingMessage: string = "";

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
        this.usersService.getById(id).subscribe({
          next: (user: any) => {
            this.user = user;
            console.log(this.user);
            this.miFormulario = new FormGroup({
              first_name: new FormControl(this.user.first_name, [
                Validators.required
              ]),
              last_name: new FormControl(this.user.last_name, [
                Validators.required
              ]),
              email: new FormControl(this.user.email, [
                Validators.required,
                Validators.email
              ]),
              image: new FormControl(this.user.image, [
                Validators.required,
                Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)
              ]),
              _id: new FormControl(this.user._id, []),
              id: new FormControl(this.user.id, []),
              password: new FormControl(this.user.password, []),
              username: new FormControl(this.user.username, []),
            }, []);
          },
          error: (error: any) => {
            console.error(error);
          }
        });


      } else {
        this.actualizando = false
      }
    })
  }

  recogerDatosForm() {
    let newUser = this.miFormulario.value;
    console.log(newUser);
    if (this.actualizando) {
      // Actualizar usuario existente
      this.usersService.updateUser(newUser._id, newUser).subscribe({
        next: (data: any) => {
          data.error ? (this.updatingUserError = true, this.errorUpdatingMessage = data.error) : (this.user = data, this.updatedUser = true, this.miFormulario.reset());
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    } else {
      // Crear usuario nuevo
      this.usersService.createNewUser(newUser).subscribe({
        next: (data: any) => {
          console.log(data);
          data.error ? (this.creatingUserError = true, this.errorCreatingMessage = data.error) : (this.user = data, this.createdUser = true);
          this.miFormulario.reset();
        },
        error: (error: any) => {
          console.error(error);
        }
      });

    }
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.miFormulario.get(pControlName)?.hasError(pError) && this.miFormulario.get(pControlName)?.touched) {
      return true
    }
    return false
  }
}

