import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  public displayedColumns: Array<string> = [
    'login',
    'email',
    'phone',
    'role',
    'status',
    'dateChange',
    'dateCreation',
    'salaryAvailability',
    'actions',
  ];
  public dataSource = new MatTableDataSource<any>();

  public constructor(private userService: UserService) {}

  public ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  // Функция для блокировки/разблокировки пользователя
  public toggleBlock(user: any): void {
    user.status = user.status === 'Активен' ? 'Заблокирован' : 'Активен';
  }
}
