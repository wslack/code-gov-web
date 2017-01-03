import { Routes, RouterModule } from '@angular/router';
import { AgenciesComponent, AgencyComponent} from '../../utils/app-components';
import { AGENCIES } from '../../services/agency';


export const AGENCY_ROUTES: Routes = [
  {
    path: 'agencies',
    component: AgenciesComponent,
    children: [
      { path: '', redirectTo: AGENCIES[0].id },
      { path: ':id', component: AgencyComponent }
    ]
  }
];
