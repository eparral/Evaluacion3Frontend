import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { InicioComponent } from './pages/inicio/inicio.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'solicitudes', component: FormularioComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];
