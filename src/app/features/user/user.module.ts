import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserActionsComponent } from './view/actions/user-actions.component';
import { UserFilterComponent } from './view/filter/user-filter.component';
import { UserListComponent } from './view/list/user-list.component';
import { UserPaginatorComponent } from './view/paginator/user-paginator.component';
import { UserTableComponent } from './view/table/user-table.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserFilterComponent,
    UserPaginatorComponent,
    UserTableComponent,
    UserActionsComponent
  ],
  imports: [CommonModule, SharedModule],
  exports: [UserListComponent]
})
export class UserModule {}
