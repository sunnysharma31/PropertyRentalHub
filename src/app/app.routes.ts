import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { ViewFullPropertyDetailsComponent } from './view-full-property-details/view-full-property-details.component';

import { AuthGuard } from './auth.guard';
import { SearchPropertyComponent } from './search-property/search-property.component';

export const routes: Routes = [
    { path: '',  redirectTo:'properties', pathMatch:"full"},
    { path: 'properties', component : PropertyDetailsComponent},
    { path: 'properties/:id',  component: ViewFullPropertyDetailsComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: RegisterComponent },
    { path: 'searchProperty', component: SearchPropertyComponent },
    { path: 'postProperty', component: AddPropertyComponent , canActivate: [AuthGuard] },
    { path: '**', component: PageNotFoundComponent },

];
