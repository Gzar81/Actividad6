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
  deleted: boolean = false;
  deletingError: boolean = false;
  errorMessage: string = "";

  constructor(private usersService: UsersService) { }

  deleteUser(userId: string) {
    this.usersService.deleteUser(userId).subscribe({
      next: (data: any) => {
        console.log(data)
        data.error ? (this.deleted = false, this.deletingError = true, this.errorMessage = data.error) : this.deleted = true;
      },
      error: (error: any) => {
        console.error(error)
      }
    });
  }

}
