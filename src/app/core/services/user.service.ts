import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private isStorageBlocked = false; // Флаг для блокировки

  public constructor(private http: HttpClient) {}

  // Получаем пользователей с API или из localStorage
  public getUsers(): Observable<Array<User>> {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      return of(JSON.parse(storedUsers)); // Возвращаем пользователей из localStorage
    } else {
      return this.http.get<Array<User>>(this.apiUrl).pipe(
        tap(users => {
          this.saveUsersToLocalStorage(users); // Сохраняем в localStorage
        })
      );
    }
  }

  public addUser(newUser: User): void {
    if (!this.isStorageBlocked) {
      // Проверка перед записью
      const storedUsers = localStorage.getItem('users');
      let users: Array<User> = [];

      if (storedUsers) {
        users = JSON.parse(storedUsers);
      }

      newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
      users.push(newUser);

      localStorage.setItem('users', JSON.stringify(users));
    } else {
      console.log('Запись в localStorage заблокирована');
    }
  }

  // Блокируем запись в localStorage
  public blockLocalStorage(): void {
    this.isStorageBlocked = true;
  }

  // Разблокируем запись в localStorage
  public unblockLocalStorage(): void {
    this.isStorageBlocked = false;
  }

  public get storageBlocked(): boolean {
    return this.isStorageBlocked;
  }

  public toggleUserStatus(user: User): void {
    if (!this.isStorageBlocked) {
      user.status = user.status === 'Активен' ? 'Заблокирован' : 'Активен';
      this.updateLocalStorage(user);
    } else {
      console.log('Запись в localStorage заблокирована');
    }
  }

  private updateLocalStorage(updatedUser: User): void {
    const storedUsers = localStorage.getItem('users');
    let users: Array<User> = [];

    if (storedUsers) {
      users = JSON.parse(storedUsers);
    }

    const userIndex = users.findIndex(u => u.id === updatedUser.id);
    if (userIndex > -1) {
      users[userIndex] = updatedUser;
    }

    localStorage.setItem('users', JSON.stringify(users));
  }

  public saveUsersToLocalStorage(users: Array<User>): void {
    localStorage.setItem('users', JSON.stringify(users));
  }
}
