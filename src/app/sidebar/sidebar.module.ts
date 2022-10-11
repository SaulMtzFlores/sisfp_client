import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { AuthSidebarComponent } from './auth-sidebar/auth-sidebar.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ SidebarComponent, AuthSidebarComponent ],
    exports: [ SidebarComponent, AuthSidebarComponent ]
})

export class SidebarModule {}
