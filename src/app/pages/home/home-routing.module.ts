import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraphicsComponent } from 'src/app/components/graphics/graphics.component';
import { HomeComponent } from './home.component';
import { ReportsComponent } from 'src/app/components/reports/reports.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'reports', component: ReportsComponent },
      { path: 'reports-graphics', component: GraphicsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
