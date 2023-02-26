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

  constructor(private activatedRoute: ActivatedRoute,
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

}
