import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() user: User | any;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {

  }

  deleteUser(user: User) {
    this.usersService.deleteUser(`${user._id}`).subscribe({
      next: (data: any) => {
        data.error ? alert(data.error) : alert(`Usuario ${data.first_name} ${data.last_name} eliminado`)
      },
      error: (error: any) => {
        console.error(error)
      }
    });
  }

}
