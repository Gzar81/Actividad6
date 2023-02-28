import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User | any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      let id = params.id;
      this.usersService.getById(id).subscribe(
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
    this.usersService.deleteUser(id).subscribe((data: any) => {
      console.log(data);
      alert(`Usuario ${this.user.first_name} ${this.user.last_name} eliminado`)
      this.router.navigate(['/home']);
      // Aquí puedes hacer algo como redirigir a la página de inicio o recargar la lista de usuarios
    }, (error: any) => {
      console.log(error);
    });
  }


}
