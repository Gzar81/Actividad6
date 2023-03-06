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
  currentPage: number = 1;
  totalPages: number = 1;
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.goToPage()
  }

  goToPage(pNum: number = 1): void {
    this.usersService.getAllUsers(pNum).subscribe({
      next: (response: any) => {
        console.log(response)
        this.currentPage = response.page;
        this.totalPages = response.total_pages;
        this.users = response.results;
      },
      error: (error: any) => {
        console.error(error)
      }
    });
  }
}
