# The Tour of Heroes tutorial

## This tutorial is from https://angular.io/docs/ts/latest/tutorial/

This is a summary of that tutorial. I put/copied it here becuase that tutorial might change in the future and so that I will still have a copy of the tutorial even when I'm offline -- I will be using this as a reference when I use Angular 2 in my projects.


## 1. see folder "1-Introduction"

## 2. see folder "2-TheHeroEditor"

## 3. see folder "3-Master_Detail"

## 4. see folder "4-MultipleComponents"

## 5. see folder "5-Services"

## 6. see folder "6-Routing" 

# 7. HTTP - Getting and Saving Data with HTTP

## Keep the app transpiling and running
```
npm start
```

## Providing HTTP Services

Http is not a core Angular module. It's Angular's optional approach to web access and it exists as a separate add-on module called @angular/http, shipped in a separate script file as part of the Angular npm package.

Fortunately we're ready to import from @angular/http because systemjs.config configured SystemJS to load that library when we need it.

### Register (provide) HTTP services

Our app will depend upon the Angular http service which itself depends upon other supporting services. The HTTP_PROVIDERS array from @angular/http library holds providers for the complete set of http services.

We should be able to access Http services from anywhere in the application. So we register them in the bootstrap call of `main.ts` where we launch the application and its root AppComponent.

``` TypeScript
import { bootstrap }      from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent }         from './app.component';
import { appRouterProviders }   from './app.routes';

bootstrap(AppComponent, [
  appRouterProviders,
  HTTP_PROVIDERS
]);
```

**Notice that we supply `HTTP_PROVIDERS` in an array as the second parameter to the bootstrap method. This has the same effect as the providers array in `@Component` decorator.**


## Simulating the web API

We generally recommend registering application-wide services in the root AppComponent providers. Here we're registering in main for a special reason.

Our application is in the early stages of development and far from ready for production. We don't even have a web server that can handle requests for heroes. Until we do, we'll have to fake it.

We're going to trick the HTTP client into fetching and saving data from a mock service, the in-memory web API.

The application itself doesn't need to know and shouldn't know about this. So we'll slip the in-memory web API into the configuration above the AppComponent.

Here is a version of main that performs this trick

In `app/main.ts (final)`
``` TypeScript
// Imports for loading & configuring the in-memory web api
import { XHRBackend } from '@angular/http';

import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { InMemoryDataService }               from './in-memory-data.service';

// The usual bootstrapping imports
import { bootstrap }      from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent }         from './app.component';
import { appRouterProviders }   from './app.routes';

bootstrap(AppComponent, [
    appRouterProviders,
    HTTP_PROVIDERS,
    { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
    { provide: SEED_DATA, useClass: InMemoryDataService }      // in-mem server data
]);
```

We're replacing the default XHRBackend, the service that talks to the remote server, with the in-memory web API service after priming it as follows:

In `app/in-memory-data.service.ts`
``` TypeScript
export class InMemoryDataService {
  createDb() {
    let heroes = [
      {id: 11, name: 'Mr. Nice'},
      {id: 12, name: 'Narco'},
      {id: 13, name: 'Bombasto'},
      {id: 14, name: 'Celeritas'},
      {id: 15, name: 'Magneta'},
      {id: 16, name: 'RubberMan'},
      {id: 17, name: 'Dynama'},
      {id: 18, name: 'Dr IQ'},
      {id: 19, name: 'Magma'},
      {id: 20, name: 'Tornado'}
    ];
    return {heroes};
  }
}
```

This file replaces the mock-heroes.ts which is now safe to delete.

> This chapter is an introduction to the Angular HTTP library. Please don't be distracted by the details of this backend substitution. Just follow along with the example.

> Learn more later about the in-memory web API in the HTTP client chapter. Remember, the in-memory web API is only useful in the early stages of development and for demonstrations such as this Tour of Heroes. Skip it when you have a real web API server.


## Let's convert getHeroes() to use HTTP:

app/hero.service.ts (new constructor and revised getHeroes)
``` TypeScript
  private heroesUrl = 'app/heroes';  // URL to web api

  constructor(private http: Http) { }

  getHeroes() {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);
  }
```

### HTTP Promise

The Angular http.get returns an RxJS Observable. Observables are a powerful way to manage asynchronous data flows. We'll learn about Observables later in this chapter.

For now we get back on familiar ground by immediately by converting that Observable to a Promise using the toPromise operator.

```
.toPromise()
```

Unfortunately, the Angular Observable doesn't have a toPromise operator ... not out of the box. The Angular Observable is a bare-bones implementation.


There are scores of operators like toPromise that extend Observable with useful capabilities. If we want those capabilities, we have to add the operators ourselves. That's as easy as importing them from the RxJS library like this:

```
import 'rxjs/add/operator/toPromise';
```


# JBOY: look at the docs from here onwards






