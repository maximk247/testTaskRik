export interface User {
  id: number;
  login: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  salaryAvailability: boolean;
  dateChange: string;
  dateCreation: string;
}
enum UserRole {
  Administrator = 'Администратор',
  User = 'Пользователь'
}

enum UserStatus {
  Active = 'Активен',
  Blocked = 'Заблокирован'
}

export interface UserFilter {
  login: string;
  phone: string;
  email: string;
  role: UserRole | '';
  dateCreation: string;
  dateChange: string;
  status: UserStatus | '';
}
