import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { User, UserFilter } from 'src/app/core/models/user.model';
import { SnackbarNotificationComponent } from 'src/app/shared/components/snackbar-notification/snackbar-notification.component';
import { UserListViewModel } from '../../viewmodels/user-list.viewmodel';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public pagedUsers$: Observable<Array<User>> | undefined;
  public length = 0;
  public pageSize = 5;
  public currentPage = 0;
  public selectedUsers: Array<User> = [];
  public isFilterVisible = true;

  public constructor(
    private viewModel: UserListViewModel,
    private snackBar: MatSnackBar
  ) {
    this.viewModel.length$.subscribe(
      (length: number) => (this.length = length)
    );
  }

  public ngOnInit(): void {
    this.viewModel.loadUsers();
    this.pagedUsers$ = this.viewModel.pagedUsers$;

    // Подписываемся на уведомления и показываем их через MatSnackBar
    this.viewModel.notification$.subscribe(message => {
      this.showNotification(message);
    });
  }

  public onPageChange(event: PageEvent): void {
    this.viewModel.onPageChange(event.pageIndex, event.pageSize);
  }

  public onToggleBlock(selectedUsers: Array<User>): void {
    selectedUsers.forEach(user => this.viewModel.toggleBlock(user));
  }

  public addUser(): void {
    this.viewModel.addUser();
  }

  public onUsersSelected(selectedUsers: Array<User>): void {
    this.selectedUsers = selectedUsers;
  }

  public unblockLocalStorage(): void {
    this.viewModel.unblockLocalStorage();
  }

  public blockLocalStorage(): void {
    this.viewModel.blockLocalStorage();
  }

  public toggleFilter(): void {
    this.isFilterVisible = !this.isFilterVisible;
  }

  public onFilterChange(filter: UserFilter): void {
    this.viewModel.applyFilter(filter);
  }

  public onCancelFilter(): void {
    this.viewModel.clearFilter();
  }

  private showNotification(message: string): void {
    this.snackBar.openFromComponent(SnackbarNotificationComponent, {
      data: { message },
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-custom']
    });
  }
}
