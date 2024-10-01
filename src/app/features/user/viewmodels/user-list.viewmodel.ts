import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User, UserFilter } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserListViewModel {
  private usersSubject = new BehaviorSubject<Array<User>>([]);
  public users$: Observable<Array<User>> = this.usersSubject.asObservable();

  private pagedUsersSubject = new BehaviorSubject<Array<User>>([]);
  public pagedUsers$: Observable<Array<User>> =
    this.pagedUsersSubject.asObservable();

  private selectedUsersSubject = new BehaviorSubject<Array<User>>([]);
  public selectedUsers$: Observable<Array<User>> =
    this.selectedUsersSubject.asObservable();

  private filterSubject = new BehaviorSubject<UserFilter>({
    login: '',
    phone: '',
    role: '',
    email: '',
    status: '',
    dateCreation: '',
    dateChange: ''
  });

  private lengthSubject = new BehaviorSubject<number>(0);
  public length$: Observable<number> = this.lengthSubject.asObservable();

  private notificationSubject = new Subject<string>();
  public notification$: Observable<string> =
    this.notificationSubject.asObservable();

  private currentPage = 0;
  private pageSize = 5;

  public constructor(private userService: UserService) {}

  public loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.usersSubject.next(users);
      this.applyFilterAndPaginate();
    });
  }

  public onPageChange(pageIndex: number, pageSize: number): void {
    this.currentPage = pageIndex;
    this.pageSize = pageSize;
    this.applyFilterAndPaginate();
  }

  public applyFilter(filter: UserFilter): void {
    this.filterSubject.next(filter);
    this.currentPage = 0;
    this.applyFilterAndPaginate();
  }

  public clearFilter(): void {
    this.filterSubject.next({
      login: '',
      phone: '',
      email: '',
      role: '',
      dateCreation: '',
      dateChange: '',
      status: ''
    });
    this.applyFilterAndPaginate();
  }

  public toggleBlock(user: User): void {
    this.userService.toggleUserStatus(user);
    this.applyFilterAndPaginate();
    this.notify('Пользователь обновлен');
  }

  public addUser(): void {
    const newUser: User = {
      id: 0,
      login: 'newUser',
      email: 'newuser@example.com',
      phone: '+7(900) 123-45-67',
      role: 'Пользователь',
      dateCreation: new Date().toLocaleDateString(),
      dateChange: new Date().toLocaleDateString(),
      status: 'Активен',
      salaryAvailability: true
    };
    this.userService.addUser(newUser);
    this.loadUsers();
    if (!this.userService.storageBlocked) {
      this.notify('Пользователь добавлен');
    }
  }

  public blockLocalStorage(): void {
    this.userService.blockLocalStorage();
    this.notify('Локальное хранилище заблокировано');
  }

  public unblockLocalStorage(): void {
    this.userService.unblockLocalStorage();
    this.notify('Локальное хранилище разблокировано');
  }

  private applyFilterAndPaginate(): void {
    const filter = this.filterSubject.getValue();
    const users = this.usersSubject.getValue();

    const filteredUsers = users.filter(user => {
      return (
        (!filter.login || user.login.includes(filter.login)) &&
        (!filter.phone || user.phone.includes(filter.phone)) &&
        (!filter.email || user.email.includes(filter.email)) &&
        (!filter.role || user.role === filter.role) &&
        (!filter.status || user.status === filter.status) &&
        (!filter.dateCreation || user.dateCreation === filter.dateCreation) &&
        (!filter.dateChange || user.dateChange === filter.dateChange)
      );
    });

    this.lengthSubject.next(filteredUsers.length);

    const startIndex = this.currentPage * this.pageSize;
    const paginatedUsers = filteredUsers.slice(
      startIndex,
      startIndex + this.pageSize
    );

    this.pagedUsersSubject.next(paginatedUsers);
  }

  // Метод для отправки уведомлений
  private notify(message: string): void {
    this.notificationSubject.next(message);
  }

  public getAllUsers(): Array<User> {
    return this.usersSubject.getValue();
  }
}
