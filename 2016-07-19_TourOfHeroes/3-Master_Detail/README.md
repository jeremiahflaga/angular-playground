# The Tour of Heroes tutorial

## This tutorial is from https://angular.io/docs/ts/latest/tutorial/

This is a summary of that tutorial. I put/copied it here becuase that tutorial might change in the future and so that I will still have a copy of the tutorial even when I'm offline -- I will be using this as a reference when I use Angular 2 in my projects.


## 1. see folder "1-Introduction"

## 2. see folder "2-TheHeroEditor"

## 3. Master/Detail

### Keep the app transpiling and running
```
npm start
```

### Let’s create an array of ten heroes at the bottom of `app.component.ts`.
``` TypeScript
const HEROES: Hero[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];
```

We aspire to fetch this list of heroes from a web service, but let’s take small steps first and display mock heroes.

### Let’s create a public property in AppComponent that exposes the heroes for binding.

In `app.component.ts` (hero array property)
``` TypeScript
public heroes = HEROES;
```

### Displaying heroes in a template
``` HTML
<h2>My Heroes</h2>
<ul class="heroes">
  <li>
    <!-- each hero goes here -->
  </li>
</ul>
```

### Listing heroes with ngFor
``` HTML
<li *ngFor="let hero of heroes">
```

<blockquote>
  <div class="l-sub-section"><p>The (<code>*</code>) prefix to <code>ngFor</code> indicates that the <code>&lt;li&gt;</code> element and its children
constitute a master template.</p>
<p>The <code>ngFor</code> directive iterates over the <code>heroes</code> array returned by the <code>AppComponent.heroes</code> property
and stamps out instances of this template.</p>
<p>The quoted text assigned to <code>ngFor</code> means
“<em>take each hero in the <code>heroes</code> array, store it in the local <code>hero</code> variable,
and make it available to the corresponding template instance</em>”.</p>
<p>The <code>let</code> keyword before "hero" identifies <code>hero</code> as a template input variable.
We can reference this variable within the template to access a hero’s properties.</p>
<p>Learn more about <code>ngFor</code> and template input variables in the
<a href="../guide/displaying-data.html#ngFor">Displaying Data</a> and
<a href="../guide/template-syntax.html#ngFor">Template Syntax</a> chapters.</p>
</div>
</blockquote>

### Now we insert some content between the `<li>` tags that uses the hero template variable to display the hero’s properties.
``` HTML
<li *ngFor="let hero of heroes">
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
```

### Let’s add some styles to our component by setting the styles property on the @Component decorator to the following CSS classes:
``` JSON
styles: [`
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .heroes {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  .heroes li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .heroes li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .heroes li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .heroes .text {
    position: relative;
    top: -3px;
  }
  .heroes .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }
`]
```

**When we assign styles to a component they are scoped to that specific component. Our styles will only apply to our AppComponent and won't "leak" to the outer HTML.**

### Let’s connect the master to the detail through a `selectedHero` component property bound to a click event.

We modify the `<li>` by inserting an Angular event binding to its click event.

``` HTML
<li *ngFor="let hero of heroes" (click)="onSelect(hero)">
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
```
```
(click)="onSelect(hero)"
```

The parenthesis identify the `<li>` element’s `click` event as the target. The expression to the right of the equal sign calls the `AppComponent` method, `onSelect()`, passing the template input variable hero as an argument. That’s the same hero variable we defined previously in the ngFor.

### We no longer need the static hero property of the AppComponent. Replace it with this simple selectedHero property:
``` JSON
selectedHero: Hero;
```

### Add the click handler - Now add an onSelect method that sets the selectedHero property to the hero the user clicked.
``` TypeScript
onSelect(hero: Hero) { this.selectedHero = hero; }
```

### Let’s fix the template to bind to the new selectedHero property.
``` HTML
<h2>{{selectedHero.name}} details!</h2>
<div><label>id: </label>{{selectedHero.id}}</div>
<div>
    <label>name: </label>
    <input [(ngModel)]="selectedHero.name" placeholder="name"/>
</div>
```

### Hide the empty detail with `ngIf`

When our app loads we see a list of heroes, but a hero is not selected. The selectedHero is undefined. That’s why we'll see the following error in the browser’s console:
```
EXCEPTION: TypeError: Cannot read property 'name' of undefined in [null]
```
> See the image named _"TypeError- Cannot read property 'name' of undefined.png"_. TAKE NOTE that the image has lots of errors even though the cause of the error is only ONE.

Remember that we are displaying selectedHero.name in the template. This name property does not exist because selectedHero itself is undefined.

We'll address this problem by keeping the hero detail out of the DOM until there is a selected hero.

We wrap the HTML hero detail content of our template with a `<div>`. Then we add the `ngIf` built-in directive and set it to the `selectedHero` property of our component.
``` HTML
component.ts (ngIf)

<div *ngIf="selectedHero">
  <h2>{{selectedHero.name}} details!</h2>
  <div><label>id: </label>{{selectedHero.id}}</div>
  <div>
    <label>name: </label>
    <input [(ngModel)]="selectedHero.name" placeholder="name"/>
  </div>
</div>
```


> `ngIf` and `ngFor` are called “structural directives” because they can change the structure of portions of the DOM. In other words, they give structure to the way Angular displays content in the DOM.


### Styling the selection

We’ll add a property binding on class for the selected class to the template. We'll set this to an expression that compares the current `selectedHero` to the `hero`.

The key is the name of the CSS class (`selected`). The value is `true` if the two heroes match and `false` otherwise. We’re saying “apply the `selected` class if the heroes match, remove it if they don’t”.

``` TypeScript
[class.selected]="hero === selectedHero"
```


Notice in the template that the `class.selected` is surrounded in square brackets (`[]`). This is the syntax for a **property binding**, a binding in which data flows one way from the data source (the expression hero === selectedHero) to a property of class.

``` HTML
<li *ngFor="let hero of heroes"
  [class.selected]="hero === selectedHero"
  (click)="onSelect(hero)">
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
```