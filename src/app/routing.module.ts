import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassesComponent } from './attend/classes/classes.component';
import { StudentsListComponent } from './attend/students/students.component';
import { PastComponent } from './attend/past/past.component';

const routes: Routes = [
    { path: 'attend', redirectTo: 'attend/classes', pathMatch: 'full' },
    {
        path: 'attend', children: [
            { path: 'classes', component: ClassesComponent },
            { path: 'students', component: StudentsListComponent },
            { path: 'past', component: PastComponent }
        ]
    },
    { path: '**', redirectTo: 'attend/classes' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }