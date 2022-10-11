import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { FormsModule } from '@angular/forms';
import { FooterModule } from 'app/shared/footer/footer.module';
import { NavbarModule } from 'app/shared/navbar/navbar.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FixedPluginModule } from 'app/shared/fixedplugin/fixedplugin.module';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    FooterModule,
    NavbarModule,
    FixedPluginModule,
    NgbModule
  ]
})
export class AuthLayoutModule { }
