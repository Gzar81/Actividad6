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
  deleted: boolean = false;
  deletingError: boolean = false;
  errorMessage: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      let id = params.id;
      this.usersService.getById(id).subscribe({
        next: (user: User) => {
          this.user = user;
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    });
  }

  deleteUser(id: string) {
    this.usersService.deleteUser(id).subscribe({
      next: (data: any) => {
        console.log(data)
        data.error ? (this.deletingError = true, this.errorMessage = data.error) : this.deleted = true;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }


}
