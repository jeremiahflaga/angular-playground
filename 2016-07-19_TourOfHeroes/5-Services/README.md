# The Tour of Heroes tutorial

## This tutorial is from https://angular.io/docs/ts/latest/tutorial/

This is a summary of that tutorial. I put/copied it here becuase that tutorial might change in the future and so that I will still have a copy of the tutorial even when I'm offline -- I will be using this as a reference when I use Angular 2 in my projects.


## 1. see folder "1-Introduction"

## 2. see folder "2-TheHeroEditor"

## 3. see folder "3-Master_Detail"

## 4. see folder "4-MultipleComponents"

## 5. Services - We create a reusable service to manage our hero data calls

Because data services are invariably asynchronous, we'll finish the chapter with a Promise-based version of the data service.

### Keep the app transpiling and running
```
npm start
```

### Creating a Hero Service

We can refactor this hero data acquisition business to a single service that provides heroes, and share that service with all components that need heroes.\

Create a file in the `app` folder called `hero.service.ts`.
``` TypeScript
import { Injectable } from '@angular/core';

@Injectable()
export class HeroService {
}
```

> Don't forget the parentheses! Neglecting them leads to an error that's difficult to diagnose.

TypeScript sees the @Injectable() decorator and emits metadata about our service, metadata that Angular may need to inject other dependencies into this service.

The HeroService doesn't have any dependencies at the moment. Add the decorator anyway. It is a "best practice" to apply the @Injectable() decorator ​from the start​ both for consistency and for future-proofing.

### Getting Heroes

Add a `getHeroes` method stub.
``` TypeScript
@Injectable()
export class HeroService {
  getHeroes() {
  }
}
```

### We already have mock Hero data sitting in the AppComponent. It doesn't belong there. It doesn't belong here either. We'll move the mock data to its own file.

Cut the HEROES array from app.component.ts and paste it to a new file in the app folder named mock-heroes.ts. We copy the import {Hero} ... statement as well because the heroes array uses the Hero class.

``` TypeScript
import { Hero } from './hero';
export const HEROES: Hero[] = [
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
```

We export the HEROES constant so we can import it elsewhere — such as our HeroService.

Meanwhile, back in app.component.ts where we cut away the HEROES array, we leave behind an uninitialized heroes property:
``` TypeScript
heroes: Hero[];
```

### Return Mocked Heroes

Back in the HeroService we import the mock HEROES and return it from the getHeroes method. Our HeroService looks like this:

``` TypeScript
import { Injectable } from '@angular/core';

import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {
  getHeroes() {
    return HEROES;
  }
}
```

### Use the Hero Service

``` TypeScript
import { HeroService } from './hero.service';
```

### Inject the HeroService

1. We add a constructor that also defines a private property.
2. We add to the component's providers metadata.

In `app/app.component.ts (constructor)`
``` TypeScript
constructor(private heroService: HeroService) { }
```
The constructor itself does nothing. The parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site.

Now Angular will know to supply an instance of the HeroService when it creates a new AppComponent.

The injector does not know yet how to create a HeroService. If we ran our code now, Angular would fail with an error:

```
EXCEPTION: No provider for HeroService! (AppComponent -> HeroService)
```

We have to teach the injector how to make a HeroService by registering a HeroService provider. Do that by adding the following providers array property to the bottom of the component metadata in the @Component call.
``` TypeScript
providers: [HeroService]
```

The `providers` array tells Angular to create a fresh instance of the HeroService when it creates a new AppComponent. The AppComponent can use that service to get heroes and so can every child component of its component tree.

### getHeroes in the AppComponent
``` TypeScript
  getHeroes() {
    this.heroes = this.heroService.getHeroes();
  }
```

### The ngOnInit Lifecycle Hook

AppComponent should fetch and display heroes without a fuss. Where do we call the getHeroes method? In a constructor? We do not!

If not the constructor, something has to call getHeroes.

Angular will call it if we implement the Angular ngOnInit Lifecycle Hook. Angular offers a number of interfaces for tapping into critical moments in the component lifecycle: at creation, after each change, and at its eventual destruction.

Each interface has a single method. When the component implements that method, Angular calls it at the appropriate time.

Here's the essential outline for the OnInit interface:
``` TypeScript
import { OnInit } from '@angular/core';

export class AppComponent implements OnInit {
  ngOnInit() {
  }
}
```
``` TypeScript
  ngOnInit() {
    this.getHeroes();
  }
```

## We're getting closer. But something isn't quite right.

### Async Services and Promises

Someday we're going to get heroes from a remote server. We don’t call http yet, but we aspire to in later chapters.

When we do, we'll have to wait for the server to respond and we won't be able to block the UI while we wait, even if we want to (which we shouldn't) because the browser won't block.

We'll have to use some kind of asynchronous technique and that will change the signature of our getHeroes method.

We'll use _Promises_.

### The Hero Service makes a Promise

A Promise is ... well it's a promise to call us back later when the results are ready. We ask an asynchronous service to do some work and give it a callback function. It does that work (somewhere) and eventually it calls our function with the results of the work or an error.

> We are simplifying. Learn about ES2015 Promises [here](http://exploringjs.com/es6/ch_promises.html) and elsewhere on the web.

``` TypeScript
getHeroes() {
  return Promise.resolve(HEROES);
}
```

### Act on the Promise

We have to change our implementation to act on the Promise when it resolves. When the Promise resolves successfully, then we will have heroes to display.

We pass our callback function as an argument to the Promise's then method:

``` TypeScript
getHeroes() {
  this.heroService.getHeroes().then(heroes => this.heroes = heroes);
}
```


### Appendix: Take it slow

We can simulate a slow connection.

Import the Hero symbol and add the following getHeroesSlowly method to the HeroService

In `app/hero.service.ts (getHeroesSlowly)`:
``` TypeScript
getHeroesSlowly() {
  return new Promise<Hero[]>(resolve =>
    setTimeout(() => resolve(HEROES), 2000) // 2 seconds
  );
}
```
Like getHeroes, it also returns a Promise. But this Promise waits 2 seconds before resolving the Promise with mock heroes.

Back in the AppComponent, replace heroService.getHeroes with heroService.getHeroesSlowly and see how the app behaves.