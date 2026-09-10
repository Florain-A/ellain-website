import { Routes } from '@angular/router';
import { Home } from './modules/home/home';
import { About } from './modules/about/about';
import { Contact } from './modules/contact/contact';
import { MainLayout } from './layout/main-layout/main-layout';



export const routes: Routes = [
   
    {
        path: '**',
        redirectTo: '' //nonexistent routes will redirect to home page
    },
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: '',
                component: Home
            },
            {
                path: 'about',
                component: About
            },
            {
                path: 'contact',
                component: Contact
            }
        ]
    }
];
