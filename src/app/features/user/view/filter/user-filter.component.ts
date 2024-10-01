import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFilter } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss']
})
export class UserFilterComponent implements OnInit {
  @Output() public applyFilter = new EventEmitter<UserFilter>();
  @Output() public cancelFilter = new EventEmitter<void>();
  public filterForm: FormGroup = new FormGroup({});

  public constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.filterForm = this.fb.group({
      // Логин - только буквы и цифры
      login: ['', [Validators.pattern('^[a-zA-Z0-9]+$')]],
      // Телефон - формат (XXX) XXX-XXXX или +7(XXX) XXX-XX-XX
      phone: ['', [Validators.pattern('^((\\+7|7|8)+([0-9]){10})$')]],
      // Email - встроенная валидация на email + проверка символов
      email: [
        '',
        [
          Validators.email,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
          )
        ]
      ],
      role: ['', [Validators.pattern('^(Администратор|Пользователь|)$')]],
      // Дата создания и изменения - формат dd/mm/yyyy
      dateCreation: ['', [Validators.pattern('^\\d{2}/\\d{2}/\\d{4}$')]],
      dateChange: ['', [Validators.pattern('^\\d{2}/\\d{2}/\\d{4}$')]],
      // Статус - только "Активен" или "Заблокирован"
      status: ['', [Validators.pattern('^(Активен|Заблокирован)$')]]
    });
  }

  public onSubmit(): void {
    if (this.filterForm.valid) {
      this.applyFilter.emit(this.filterForm.value);
    }
  }

  public onCancel(): void {
    this.cancelFilter.emit();
  }

  public onReset(): void {
    this.filterForm.reset({
      role: '',
      login: '',
      phone: '',
      email: '',
      status: '',
      dateCreation: '',
      dateChange: ''
    });
  }

  public clearField(field: string): void {
    this.filterForm.get(field)?.setValue('');
  }
}
