import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassesComponent } from './attend/classes/classes.component';
import { StudentsListComponent } from './attend/students/students.component';
import { PastComponent } from './attend/past/past.component';
import { FamiliesComponent } from './tuition/families/families.component';

const routes: Routes = [
    { path: 'attend', redirectTo: 'attend/classes', pathMatch: 'full' },
    {
        path: 'attend', children: [
            { path: 'classes', component: ClassesComponent },
            { path: 'students', component: StudentsListComponent },
            { path: 'past', component: PastComponent }
        ]
    },
    { path: 'tuition', redirectTo: 'tuition/families', pathMatch: 'full' },
    {
        path: 'tuition', children: [
            { path: 'families', component: FamiliesComponent }
        ]
    },
    { path: '**', redirectTo: 'attend/classes' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }