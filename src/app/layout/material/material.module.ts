import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatCardModule } from '@angular/material/card'
import { MatSelectModule } from '@angular/material/select'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from "@angular/material/snack-bar";


@NgModule({
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
