# The Tour of Heroes tutorial

## This tutorial is from https://angular.io/docs/ts/latest/tutorial/

This is a summary of that tutorial. I put/copied it here becuase that tutorial might change in the future and so that I will still have a copy of the tutorial even when I'm offline -- I will be using this as a reference when I use Angular 2 in my projects.


## 1. see folder "1-Introduction"

## 2. The Hero Editor

### Keep the app transpiling and running
```
npm start
```

### Show our Hero

Let's add two properties to our AppComponent

``` TypeScript
export class AppComponent {
  title = 'Tour of Heroes';
  hero = 'Windstorm';
}
```

Now we update the template in the @Component decoration with data bindings to these new properties.
``` TypeScript
template: '<h1>{{title}}</h1><h2>{{hero}} details!</h2>'
```

_The browser should refresh and display our title and hero._

### Let's convert the `hero` from a literal string to a class.

In `app.component.ts`

``` TypeScript
export class Hero {
  id: number;
  name: string;
}
```

###  let’s refactor our component’s `hero` property to be of type `Hero`

``` TypeScript
hero: Hero = {
  id: 1,
  name: 'Windstorm'
};
```

### update the binding in the template to refer to the hero’s `name` property
``` TypeScript
template: '<h1>{{title}}</h1><h2>{{hero.name}} details!</h2>'
```

### Adding more HTML
``` TypeScript
template: '<h1>{{title}}</h1><h2>{{hero.name}} details!</h2><div><label>id: </label>{{hero.id}}</div><div><label>name: </label>{{hero.name}}</div>'
```

### Multi-line template strings - using backticks instead of single quotes


``` TypeScript
template:`
  <h1>{{title}}</h1>
  <h2>{{hero.name}} details!</h2>
  <div><label>id: </label>{{hero.id}}</div>
  <div><label>name: </label>{{hero.name}}</div>
  `
```

### We want to be able to edit the hero name in a textbox.
``` TypeScript
template:`
  <h1>{{title}}</h1>
  <h2>{{hero.name}} details!</h2>
  <div>
    <label>id: </label>{{hero.id}}
  </div>
  <div>
    <label>name: </label>
    <input value="{{hero.name}}" placeholder="name">
  </div>
  `
```

### Two-Way Binding


Let’s update the template to use the **`ngModel` built-in directive** for two-way binding.
``` HTML
<input [(ngModel)]="hero.name" placeholder="name">
```