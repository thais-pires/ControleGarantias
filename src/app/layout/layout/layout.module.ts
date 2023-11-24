// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {MenuComponent} from "./menu/menu.component";
// import {MatMenuModule} from "@angular/material/menu";
// import {MatButtonModule} from "@angular/material/button";
// import {RouterLink} from "@angular/router";
// import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
// import {MatToolbarModule} from '@angular/material/toolbar';
// import { MatIconModule } from '@angular/material/icon';



// @NgModule({
//   declarations: [MenuComponent],
//   imports: [
//     CommonModule,
//     MatMenuModule,
//     MatButtonModule,
//     RouterLink,
//     FlexLayoutModule,
//     FlexModule,
//     MatToolbarModule,
//     MatIconModule
//   ],
//   exports: [MenuComponent]
// })
// export class LayoutModule { }

// layout.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MaterialModule } from '../material/material.module';


import { FlexLayoutModule } from '@angular/flex-layout';

import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, RouterModule, MatSidenavModule, MatListModule, FlexLayoutModule, MaterialModule],
  exports: [MenuComponent],
})
export class LayoutModule { }
