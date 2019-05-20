import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import {AuthGateService} from './auth-gate.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'streaming', loadChildren: './streaming/streaming.module#StreamingPageModule' },
  { path: 'landingpage', loadChildren: './landingpage/landingpage.module#LandingpagePageModule', canActivate: [AuthGateService] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'activity', loadChildren: './activity/activity.module#ActivityPageModule' },
  { path: 'register', loadChildren: './create-profile/create-profile.module#CreateProfilePageModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
