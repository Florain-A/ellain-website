import { Routes } from '@angular/router';
import { Home } from './modules/home/home';
import { About } from './modules/about/about';
import { Contact } from './modules/contact/contact';


export const routes: Routes = [
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
    },
    {
        path: '**',
        redirectTo: '' //nonexistent routes will redirect to home page
    }
];
