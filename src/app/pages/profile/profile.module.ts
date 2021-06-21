import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './category/category.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ProfileComponent } from './profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { PipesModule } from 'src/app/services/pipes/pipes.module';

@NgModule({
  declarations: [
    AdminComponent,
    CategoryComponent,
    ProfileComponent,
    ProfileEditComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ProfileRoutingModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    PipesModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileModule {}
