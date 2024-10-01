import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { User } from '../../../../core/models/user.model';
import { UserTableViewModel } from '../../viewmodels/user-table.viewmodel';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @Input() public users: Array<User> = [];
  @Output() public toggleBlock = new EventEmitter<Array<User>>();
  @Output() public selectedUsersChange = new EventEmitter<Array<User>>();

  public constructor(public viewModel: UserTableViewModel) {}

  public ngOnInit(): void {
    this.viewModel.setAllUsers(this.users);
  }

  public toggleSelectAll(event: MatCheckboxChange): void {
    this.viewModel.selectAllUsers(event.checked);
    this.selectedUsersChange.emit(this.viewModel.getSelectedUsers());
  }

  public isSelected(user: User): boolean {
    return this.viewModel.isUserSelected(user);
  }

  public onSelect(user: User, event: MatCheckboxChange): void {
    this.viewModel.toggleUserSelection(user, event.checked);
    this.selectedUsersChange.emit(this.viewModel.getSelectedUsers());
  }

  public onToggle(): void {
    this.toggleBlock.emit(this.viewModel.getSelectedUsers());
  }

  public areAllSelected(): boolean {
    return this.viewModel.areAllSelected(this.users);
  }

  public areSomeSelected(): boolean {
    return this.viewModel.areSomeSelected(this.users);
  }
}
