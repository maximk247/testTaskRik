import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-paginator',
  templateUrl: './user-paginator.component.html',
  styleUrls: ['./user-paginator.component.scss']
})
export class UserPaginatorComponent {
  @Input() public length = 0;
  @Input() public pageSize = 5;
  @Input() public pageSizeOptions: Array<number> = [5, 10, 20];
  @Input() public pageIndex = 0; // Добавляем для синхронизации двух пагинаторов между собой
  @Output() public pageChange = new EventEmitter<PageEvent>();

  public onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }
}
