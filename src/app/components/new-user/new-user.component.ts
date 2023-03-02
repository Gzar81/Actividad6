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


  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
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
          //console.log(data);
          alert(`Usuario ${data.first_name} ${data.last_name} actualizado correctamente`);
          this.miFormulario.reset();
          this.router.navigate(['/home']);
          // Aquí puedes hacer algo como redirigir a la página de inicio o recargar la lista de usuarios
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    } else {
      // Crear usuario nuevo
      this.usersService.createNewUser(newUser).subscribe({
        next: (data: any) => {
          console.log(data);
          alert(`Usuario ${data.first_name} ${data.last_name} creado correctamente`);
          this.miFormulario.reset();
          // Aquí puedes hacer algo como redirigir a la página de inicio o recargar la lista de usuarios
        },
        error: (error: any) => {
          console.log(error);
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

