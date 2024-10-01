import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent {
  @Input() public isFilterVisible = true;
  @Output() public addUser = new EventEmitter<void>();
  @Output() public blockLocaleStorage = new EventEmitter<void>();
  @Output() public unblockLocaleStorage = new EventEmitter<void>();
  @Output() public toggleFilter = new EventEmitter<void>();

  public onAddUser(): void {
    this.addUser.emit();
  }

  public onBlockLocalStorage(): void {
    this.blockLocaleStorage.emit();
  }

  public onUnblockLocalStorage(): void {
    this.unblockLocaleStorage.emit();
  }

  public onToggleFilter(): void {
    this.toggleFilter.emit();
  }
}
