import { registerHelper } from 'handlebars';

export function configureHandlebars() { 
    registerHelper('toUpperCase', (str: string) => {
        return str.toUpperCase();
    });
}
