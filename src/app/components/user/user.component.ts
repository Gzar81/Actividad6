import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User | any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      let id = params.id;
      this.userService.getById(id).subscribe(
        (user: User) => {
          this.user = user;
        },
        (error: any) => {
          console.error(error);
        }
      );
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe((data: any) => {
      console.log(data);
      alert(`Usuario ${this.user.first_name} ${this.user.last_name} eliminado`)
      // Aquí puedes hacer algo como redirigir a la página de inicio o recargar la lista de usuarios
    }, (error: any) => {
      console.log(error);
    });
  }


}
