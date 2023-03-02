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
    this.usersService.getAllUsers().subscribe({
      next: (response: any) => {
        this.users = response.results;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }


  userToDelete(user: User) {
    this.user = user;
  }

  deleteUser(user: User) {
    this.usersService.deleteUser(`${user._id}`).subscribe({
      next: (data: any) => {
        data.error ? alert(data.error) : alert(`Usuario ${data.first_name} ${data.last_name} eliminado`);
        //this.users = this.users.filter((u: User) => u._id !== user._id); Simularía el borrado en la api       
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }


}
