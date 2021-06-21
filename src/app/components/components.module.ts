import { BlockUIModule } from 'ng-block-ui';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { ModalAddCategoryComponent } from './modals/modal-add-category/modal-add-category.component';
import { ModalAddAdminComponent } from './modals/modal-add-admin/modal-add-admin.component';
import { PipesModule } from '../services/pipes/pipes.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { MatNativeDateModule } from '@angular/material/core';
import { RemoveComponent } from './modals/remove/remove.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ReportsComponent } from './reports/reports.component';
import { ModalDetailsReportComponent } from './modals/modal-details-report/modal-details-report.component';

@NgModule({
  declarations: [
    FooterComponent,
    GraphicsComponent,
    ModalAddAdminComponent,
    ModalAddCategoryComponent,
    NavbarComponent,
    RemoveComponent,
    WelcomeComponent,
    ReportsComponent,
    ModalDetailsReportComponent,
  ],
  imports: [
    BlockUIModule.forRoot(),
    CommonModule,
    ChartsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    PipesModule.forRoot(),
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    BlockUIModule,
    ChartsModule,
    FooterComponent,
    FormsModule,
    GraphicsComponent,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    ModalAddAdminComponent,
    ModalAddCategoryComponent,
    NavbarComponent,
    ReactiveFormsModule,
    RemoveComponent,
    WelcomeComponent,
  ],
  providers: [],
})
export class ComponentsModule {}
