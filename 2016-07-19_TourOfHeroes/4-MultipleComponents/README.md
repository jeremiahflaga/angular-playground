# The Tour of Heroes tutorial

## This tutorial is from https://angular.io/docs/ts/latest/tutorial/

This is a summary of that tutorial. I put/copied it here becuase that tutorial might change in the future and so that I will still have a copy of the tutorial even when I'm offline -- I will be using this as a reference when I use Angular 2 in my projects.


## 1. see folder "1-Introduction"

## 2. see folder "2-TheHeroEditor"

## 3. see folder "3-Master_Detail"

## 4. Multiple Components - We refactor the master/detail view into separate components

### Keep the app transpiling and running
```
npm start
```

### Separating the Hero Detail Component

Add a new file named `hero-detail.component.ts` to the `app` folder and create `HeroDetailComponent` as follows.
``` TypeScript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-hero-detail',
})
export class HeroDetailComponent {
}
```

When we finish here, we'll import it into `AppComponent` and create a corresponding `<my-hero-detail>` element.

### Hero Detail Template

Let’s cut the Hero Detail content from AppComponent and paste it into the new template property of HeroDetailComponent.

``` TypeScript
template: `
  <div *ngIf="hero">
    <h2>{{hero.name}} details!</h2>
    <div><label>id: </label>{{hero.id}}</div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="hero.name" placeholder="name"/>
    </div>
  </div>
  `
```

### Let’s add that `hero` property we were talking about to the component class.

```
hero: Hero;
```

### relocate the Hero class from app.component.ts to its own hero.ts file.

in `app/hero.ts`
``` TypeScript
export class Hero {
  id: number;
  name: string;
}
```

### Add the following import statement near the top of both app.component.ts and hero-detail.component.ts.

```
import { Hero } from './hero';
```

### The hero property is an input

The `HeroDetailComponent` must be told what hero to display. Who will tell it? The parent `AppComponent`!

The `AppComponent` knows which hero to show: the hero that the user selected from the list. The user's selection is in its `selectedHero` property.

We will soon update the AppComponent template so that it binds its selectedHero property to the hero property of our HeroDetailComponent. The binding might look like this:

``` HTML
<my-hero-detail [hero]="selectedHero"></my-hero-detail>
```

Notice that the hero property is the **target** of a property binding — it's in square brackets to the left of the (=).

Angular insists that we declare a **target** property to be an input property. If we don't, Angular rejects the binding and throws an error.

There are a couple of ways we can declare that hero is an input. We'll do it the way we prefer, by annotating the hero property with the @Input decorator that we imported earlier.

``` TypeScript
  @Input()
  hero: Hero;
```

### We return to the AppComponent and teach it to use the HeroDetailComponent.
```
import { HeroDetailComponent } from './hero-detail.component';
```
```
<my-hero-detail [hero]="selectedHero"></my-hero-detail>
```

### It's not happening yet!

A browser ignores HTML tags and attributes that it doesn't recognize. So does Angular.

We've imported HeroDetailComponent, we've used it in the template, but we haven't told Angular about it.

We tell Angular about it by listing it in the metadata `directives` array. Let's add that array property to the bottom of the `@Component` configuration object, immediately after the `template` and `styles` properties.

``` TypeScript
directives: [HeroDetailComponent]
```