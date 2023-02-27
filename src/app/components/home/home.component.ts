import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  users: User[] = [];
  user: User | any;
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe(
      (response: any) => {
        this.users = response.results;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  userToDelete(user: User) {
    this.user = user;
  }

  deleteUser(user: User) {
    this.usersService.deleteUser(`${user._id}`).subscribe((data: any) => {
      console.log(data);
      alert(`Usuario ${user.first_name} ${user.last_name} eliminado`)
      // Aquí puedes hacer algo como redirigir a la página de inicio o recargar la lista de usuarios
    }, (error: any) => {
      console.log(error);
    });
  }


}
