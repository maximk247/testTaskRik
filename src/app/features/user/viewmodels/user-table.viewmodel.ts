import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserTableViewModel {
  private selectedUsersSubject = new BehaviorSubject<Array<User>>([]);
  public selectedUsers$ = this.selectedUsersSubject.asObservable();

  private allUsers: Array<User> = [];

  public setAllUsers(users: Array<User>): void {
    this.allUsers = users;
  }

  public getSelectedUsers(): Array<User> {
    return this.selectedUsersSubject.getValue();
  }

  public selectAllUsers(isSelected: boolean): void {
    if (isSelected) {
      this.selectedUsersSubject.next([...this.allUsers]);
    } else {
      this.selectedUsersSubject.next([]);
    }
  }

  public isUserSelected(user: User): boolean {
    return this.getSelectedUsers().some(selected => selected.id === user.id);
  }

  public toggleUserSelection(user: User, isSelected: boolean): void {
    const selectedUsers = this.getSelectedUsers();

    if (isSelected) {
      this.selectedUsersSubject.next([...selectedUsers, user]);
    } else {
      const updatedSelectedUsers = selectedUsers.filter(u => u.id !== user.id);
      this.selectedUsersSubject.next(updatedSelectedUsers);
    }
  }

  public areAllSelected(users: Array<User>): boolean {
    return users.length > 0 && users.every(user => this.isUserSelected(user));
  }

  public areSomeSelected(users: Array<User>): boolean {
    return (
      users.some(user => this.isUserSelected(user)) &&
      !this.areAllSelected(users)
    );
  }
}
