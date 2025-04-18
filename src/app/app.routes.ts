import { Routes } from '@angular/router';
import { LoteGridComponent } from './components/lote-grid/lote-grid.component';

export const routes: Routes = [
  { path: '', component: LoteGridComponent },
  { path: 'lotes', component: LoteGridComponent }
];
