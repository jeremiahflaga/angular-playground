# The Tour of Heroes tutorial

## This tutorial is from https://angular.io/docs/ts/latest/tutorial/

This is a summary of that tutorial. I put/copied it here becuase that tutorial might change in the future and so that I will still have a copy of the tutorial even when I'm offline -- I will be using this as a reference when I use Angular 2 in my projects.


## 1. see folder "1-Introduction"

## 2. see folder "2-TheHeroEditor"

## 3. see folder "3-Master_Detail"

## 4. see folder "4-MultipleComponents"

## 5. see folder "5-Services"

## 6. Routing - We'll add Angular’s Component Router to our app 

### Keep the app transpiling and running
```
npm start
```

### Action plan

Here's our plan:

* Turn AppComponent into an application shell that only handles navigation
* Relocate the Heroes concerns within the current AppComponent to a separate HeroesComponent
* Add routing
* Create a new DashboardComponent
* Tie the Dashboard into the navigation structure

> Routing is another name for navigation. The router is the mechanism for navigating from view to view.


 ### Splitting the AppComponent

 Our current app loads AppComponent and immediately displays the list of heroes.

Our revised app should present a shell with a choice of views (Dashboard and Heroes) and then default to one of them.

The AppComponent should only handle navigation. Let's move the display of Heroes out of AppComponent and into its own HeroesComponent.

### AppComponent is already dedicated to Heroes. Instead of moving anything out of AppComponent, we'll just rename it HeroesComponent and create a new AppComponent shell separately.

The steps are to rename:

* app.component.ts file to heroes.component.ts
* AppComponent class to HeroesComponent
* Selector my-app to my-heroes

### Create AppComponent

The new AppComponent will be the application shell. It will have some navigation links at the top and a display area below for the pages we navigate to.

The initial steps are:
<ul>
<li>create a new file named <code>app.component.ts</code>.</li>
<li>define an <code>AppComponent</code> class.</li>
<li><code>export</code> it so we can reference it during bootstrapping in <code>main.ts</code>.</li>
<li>expose an application <code>title</code> property.</li>
<li>add the <code>@Component</code> metadata decorator above the class with a <code>my-app</code> selector.</li>
<li>add a template with <code>&lt;h1&gt;</code> tags surrounding a binding to the <code>title</code> property.</li>
<li>add the <code>&lt;my-heroes&gt;</code> tags to the template so we still see the heroes.</li>
<li>add the <code>HeroesComponent</code> to the <code>directives</code> array so Angular recognizes the <code>&lt;my-heroes&gt;</code> tags.</li>
<li>add the <code>HeroService</code> to the <code>providers</code> array because we'll need it in every other view.</li>
<li>add the supporting <code>import</code> statements.</li>
</ul>

``` TypeScript
import { Component } from '@angular/core'

import { HeroService }     from './hero.service';
import { HeroesComponent } from './heroes.component';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <my-heroes></my-heroes>
    `,    
    directives: [HeroesComponent],
    providers: [
        HeroService
    ]
}) 
export class AppCompoment {
    title = 'Tour of Heroes';
}
```

> REMOVE HEROSERVICE FROM THE HEROESCOMPONENT PROVIDERS
>> Go back to the HeroesComponent and remove the HeroService from its providers array. We are promoting this service from the HeroesComponent to the AppComponent. We do not want two copies of this service at two different levels of our app.

### Add Routing

We're ready to take the next step. Instead of displaying heroes automatically, we'd like to show them after the user clicks a button. In other words, we'd like to navigate to the list of heroes.

We'll need the Angular _Component Router_.

#### Set the base tag
``` HTML
<head>
  <base href="/">
```

> **Why do we need `<base href="/">`?**
>> The Component Router uses the browser's `history.pushState` for navigation. Thanks to pushState, we can make our in-app URL paths look the way we want them to look, e.g. localhost:3000/crisis-center. Our in-app URLs can be indistinguishable from server URLs.

>> Modern HTML 5 browsers were the first to support pushState which is why many people refer to these URLs as "HTML 5 style" URLs.

>> We must add a `<base href>` element tag to the index.html to make pushState routing work.



The Angular router is a combination of multiple provided services (provideRouter), multiple directives (ROUTER_DIRECTIVES), and a configuration (RouterConfig). We'll configure our routes first:

--------------------------------

## I found http://devdocs.io/ where I can download the offline documentation of Angular 2 and other frameworks. So I will stop taking notes here

NOTE: July 31, 2016 - You are now in "Configure and add the router" part.

## Aug 2, 2016 - You decided to continue taking notes here becuase you can use this to review. It's easier to review notes you yourself made.

----------------------------------

#### Routes tell the router which views to display when a user clicks a link or pastes a URL into the browser address bar.

Let's define our first route, a route to the HeroesComponent.

in `app/app.routes.ts`

``` TypeScript
import { provideRouter, RouterConfig }  from '@angular/router';
import { HeroesComponent } from './heroes.component';

const routes: RouterConfig = [
  {
    path: 'heroes',
    component: HeroesComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];
```

The route definition above has two parts:

1. path: the router matches this route's path to the URL in the browser address bar (/heroes).

2. component: the component that the router should create when navigating to this route (HeroesComponent).

### Make the router available.

The Component Router is a service. We have to import our appRouterProviders which contains our configured router and make it available to the application by adding it to the bootstrap array.

inn `app/main.ts`
``` TypeScript
import { bootstrap }    from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import { appRouterProviders } from './app.routes';

bootstrap(AppComponent, [
  appRouterProviders
]);
```
<h1 id="missing-part">The missing part</h1>

## NOTE: I think something is missing in this part of the tutorial. The `<router-outlet>` needs `directives: [ROUTER_DIRECTIVES]`. But the code for that is given way below of the tutorial. I got confused. But I was able to see the error and found a fix for it.

### At this point we want to **remove** the `<my-heroes>` and the `import { HeroesComponent }` in the `app.component.ts` because we don't want to display the heroes in there. We now want it to be displayed in the path `/heroes` and we already configured the routes to do that for us.

``` TypeScript
import { Component } from '@angular/core'
import { HeroService }     from './hero.service';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
    `,    
    directives: [],
    providers: [
        HeroService
    ]
}) 
export class AppComponent {
    title = 'Tour of Heroes';
}

```

**If we try to navigate to `http://localhost:3000/heroes` in the browser we will only see the title "Tour of Heroes". That title came from `app.component.ts`.**

### Router Outlet (This part came from the tutorial but I added the missing code below)

If we paste the path, /heroes, into the browser address bar, the router should match it to the 'Heroes' route and display the HeroesComponent. But where?

We have to tell it where by adding `<router-outlet>` marker tags to the bottom of the template. RouterOutlet is one of the `ROUTER_DIRECTIVES`. The router displays each component immediately below the `<router-outlet>` as we navigate through the application.

In `app.component.ts`:
``` TypeScript
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HeroService }     from './hero.service';
@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: [
    HeroService
  ]
})
export class AppComponent {
  title = 'Tour of Heroes';
}
```

<h1 id="missing-part-end">End of the missing part</h1>

### Router Links

We don't really expect users to paste a route URL into the address bar. We add an anchor tag to the template which, when clicked, triggers navigation to the HeroesComponent.

In `app.component.ts`:
```
template: `
  <h1>{{title}}</h1>
  <a [routerLink]="['/heroes']">Heroes</a>
  <router-outlet></router-outlet>
`,
```

Notice the `[routerLink]` binding in the anchor tag. We bind the RouterLink directive (another of the ROUTER_DIRECTIVES) to an array that tells the router where to navigate when the user clicks the link.


We define a routing instruction with a link parameters array. The array only has one element in our little sample, the quoted path of the route to follow.

> Learn about the link parameters array in the [Routing](https://angular.io/docs/ts/latest/guide/router.html#link-parameters-array) chapter.


** The AppComponent is now attached to a router and displaying routed views. For this reason and to distinguish it from other kinds of components, we call this type of component a Router Component.**


## Add a Dashboard - Routing only makes sense when we have multiple views. We need another view.

Create new file `app/dashboard.component.ts`:
``` TypeScript
import { Component } from '@angular/core';

@Component({
  selector: 'my-dashboard',
  template: '<h3>My Dashboard</h3>'
})
export class DashboardComponent { }
```

### Configure the dashboard route

In `app.routes.ts`:
``` TypeScript
import { provideRouter, RouterConfig } from '@angular/router';
import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from './dashboard.component';

const routes: RouterConfig = [
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
];

export const appRouterProviders = [
  provideRouter(routes)
];
```

#### We want the app to show the dashboard when it starts and we want to see a nice URL in the browser address bar that says /dashboard. Remember that the browser launches with / in the address bar. We can use a redirect route to make this happen.

```
{
  path: '',
  redirectTo: '/dashboard',
  pathMatch: 'full'
},
```

#### Finally, add a dashboard navigation link to the template, just above the Heroes link.

In `app.component.ts`:
``` TypeScript
template: `
  <h1>{{title}}</h1>
  <nav>
    <a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
    <a [routerLink]="['/heroes']" routerLinkActive="active">Heroes</a>
  </nav>
  <router-outlet></router-outlet>
`,
```

> We nested the two links within `<nav>` tags. They don't do anything yet but they'll be convenient when we style the links a little later in the chapter.


## Dashboard Top Heroes

Replace the template metadata with a templateUrl property that points to a new template file.
```
templateUrl: 'app/dashboard.component.html',
```

> We specify the path all the way back to the application root — app/ in this case — because Angular doesn't support relative paths by default. We can switch to [component-relative paths](https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html) if we prefer.

Create that file with these contents:
``` HTML
<h3>Top Heroes</h3>
<div class="grid grid-pad">
  <div *ngFor="let hero of heroes" (click)="gotoDetail(hero)" class="col-1-4">
    <div class="module hero">
      <h4>{{hero.name}}</h4>
    </div>
  </div>
</div>
```

There's a (click) binding to a gotoDetail method we haven't written yet and we're displaying a list of heroes that we don't have. We have work to do, starting with those heroes.

### We'd like to re-use the HeroService to populate the component's heroes array.

Recall earlier in the chapter that we removed the HeroService from the providers array of the HeroesComponent and added it to the providers array of the top level AppComponent.

**That move created a singleton HeroService instance, available to all components of the application.** Angular will inject HeroService and we'll use it here in the DashboardComponent.

``` 
import { HeroService } from './hero.service';
```

### Get heroes
``` TypeScript
import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];
    constructor(private heroService: HeroService) { }
    ngOnInit() {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1, 5));
    }
    gotoDetail() { /* not implemented yet */ }
}
```

We saw this kind of logic before in the HeroesComponent.

* create a heroes array property
* inject the HeroService in the constructor and hold it in a private heroService field.
* call the service to get heroes inside the Angular ngOnInit lifecycle hook.

The noteworthy differences: we cherry-pick four heroes (2nd, 3rd, 4th, and 5th) with slice and stub the gotoDetail method until we're ready to implement it.


## Navigate to Hero Details

### We'll add a route to the HeroDetailComponent in the AppComponent where our other routes are configured.

Parameterized route - We can add the hero's id to the URL. When routing to the hero whose id is 11, we could expect to see an URL such as this:

```
/detail/11
```

### Configure a Route with a Parameter
```
import { HeroDetailComponent } from '/hero-detail.component';

...

{
  path: 'detail/:id',
  component: HeroDetailComponent
},
```

The colon (:) in the path indicates that `:id` is a placeholder to be filled with a specific hero id when navigating to the HeroDetailComponent.


## Revise the HeroDetailComponent

Before we rewrite the HeroDetailComponent, let's review what it looks like now:

In `app/hero-detail.component.ts (current)`:
``` TypeScript
import { Component, Input } from '@angular/core';
import { Hero } from './hero';

@Component({
  selector: 'my-hero-detail',
  template: `
    <div *ngIf="hero">
      <h2>{{hero.name}} details!</h2>
      <div>
        <label>id: </label>{{hero.id}}
      </div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name"/>
      </div>
    </div>
  `
})
export class HeroDetailComponent {
  @Input() hero: Hero;
}
```

We will no longer receive the hero in a parent component property binding. The new HeroDetailComponent should take the id parameter from the `params` observable in the `ActivatedRoute` service and use the HeroService to fetch the hero with that id.

```
import { ActivatedRoute } from '@angular/router';
import { HeroService } from './hero.service';
```

We import the OnInit and OnDestroy interfaces because we'll call the HeroService inside the ngOnInit component lifecycle hook and we'll clean up our params subscription in the ngOnDestroy.
```
import { Component, OnInit, OnDestroy } from '@angular/core';
```

We inject the both the ActivatedRoute service and the HeroService into the constructor as we've done before, making private variables for both:

In `app/hero-detail.component.ts (constructor)`:
```
constructor(
  private heroService: HeroService,
  private route: ActivatedRoute) {
}
```

Inside the ngOnInit lifecycle hook, we **_subscribe_** to the `params` observable to extract the id parameter value from the ActivateRoute service and use the HeroService to fetch the hero with that id.

In `app/hero-detail.component.ts (ngOnInit)`:
``` TypeScript
  sub: any;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.heroService.getHero(id)
        .then(hero => this.hero = hero);
    });
  }
```

The hero `id` is a number. Route parameters are always strings. So **we convert the route parameter value to a number with the JavaScript `(+)` operator**.

Inside the ngOnDestroy lifecycle hook, we unsubscribe from the params subscription.
``` TypeScript
ngOnDestroy() {
  this.sub.unsubscribe();
}
```

### Add HeroService.getHero

``` TypeScript
getHero(id: number) {
  return this.getHeroes()
             .then(heroes => heroes.find(hero => hero.id === id));
}
```

### Add a goBack method that navigates backward one step in the browser's history stack.
``` TypeScript
goBack() {
  window.history.back();
}
```

> Going back too far could take us out of the application. That's acceptable in a demo. We'd guard against it in a real application, perhaps with the C[anDeactivate guard](https://angular.io/docs/ts/latest/api/router/index/CanDeactivate-interface.html).

``` HTML
<button (click)="goBack()">Back</button>
```

### Create `hero-detail.component.html`
``` HTML
<div *ngIf="hero">
  <h2>{{hero.name}} details!</h2>
  <div>
    <label>id: </label>{{hero.id}}</div>
  <div>
    <label>name: </label>
    <input [(ngModel)]="hero.name" placeholder="name" />
  </div>
  <button (click)="goBack()">Back</button>
</div>
```

```
templateUrl: 'app/hero-detail.component.html',
```


## Select a Dashboard Hero


In `app/dashboard.component.ts (gotoDetail)`
``` TypeScript
import { Router } from '@angular/router';

...

constructor(
  private router: Router,
  private heroService: HeroService) {
}

...

gotoDetail(hero: Hero) {
  let link = ['/detail', hero.id];
  this.router.navigate(link);
}
```

The `gotoDetail` method navigates in two steps:

1. set a route link parameters array
2. pass the array to the router's navigate method.

We wrote link parameters arrays in the AppComponent for the navigation links. Those arrays had only one element, the path of the destination route.

This array has two elements, the path of the destination route and a route parameter with an id field set to the value of the selected hero's id.

The two array items align with the path and :id token in the parameterized HeroDetail route configuration we added to app.routes.ts earlier in the chapter.

``` TypeScript
//In app/app.routes.ts (hero detail route)
{
  path: 'detail/:id',
  component: HeroDetailComponent
},
```

## We'll do something similar in the HeroesComponent - Select a Hero in the HeroesComponent

Delete the `<my-hero-detail>` in the template of `heroes.component.ts`

We'll throw in a small twist for variety. When the user selects a hero from the list, we won't go to the detail page. We'll show a mini-detail on this page instead and make the user click a button to navigate to the full detail page.

### Add the mini-detail

Add the following HTML fragment at the bottom of the template where the `<my-hero-detail>` used to be:

``` 
<div *ngIf="selectedHero">
  <h2>
    {{selectedHero.name | uppercase}} is my hero
  </h2>
  <button (click)="gotoDetail()">View Details</button>
</div>
```

### Format with the `UpperCasePipe`

Notice that the hero's name is displayed in CAPITAL LETTERS. That's the effect of the UpperCasePipe that we slipped into the interpolation binding. Look for it right after the pipe operator ( | ).

```
{{selectedHero.name | uppercase}} is my hero
```

Pipes are a good way to format strings, currency amounts, dates and other display data. Angular ships with several pipes and we can write our own.


### Move content out of the component file

JBOY: You know what to do based on the code below
``` TypeScript
@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls:  ['app/heroes.component.css']
})
```

### Update the component class to support navigation to the HeroDetailComponent when the user clicks the View Details button

1. Import the router
2. Inject the router in the constructor (along with the HeroService)
3. Implement the gotoDetail method by calling the router.navigate method with a two-part HeroDetail link parameters array.

``` TypeScript
  gotoDetail() {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
```

## Styling the App

### Add a `dashboard.component.css` file:
``` CSS
[class*='col-'] {
  float: left;
}
*, *:after, *:before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
h3 {
  text-align: center; margin-bottom: 0;
}
[class*='col-'] {
  padding-right: 20px;
  padding-bottom: 20px;
}
[class*='col-']:last-of-type {
  padding-right: 0;
}
.grid {
  margin: 0;
}
.col-1-4 {
  width: 25%;
}
.module {
    padding: 20px;
    text-align: center;
    color: #eee;
    max-height: 120px;
    min-width: 120px;
    background-color: #607D8B;
    border-radius: 2px;
}
h4 {
  position: relative;
}
.module:hover {
  background-color: #EEE;
  cursor: pointer;
  color: #607d8b;
}
.grid-pad {
  padding: 10px 0;
}
.grid-pad > [class*='col-']:last-of-type {
  padding-right: 20px;
}
@media (max-width: 600px) {
    .module {
      font-size: 10px;
      max-height: 75px; }
}
@media (max-width: 1024px) {
    .grid {
      margin: 0;
    }
    .module {
      min-width: 60px;
    }
}
```


### Add a `hero-detail.component.css` file:
``` CSS
label {
  display: inline-block;
  width: 3em;
  margin: .5em 0;
  color: #607D8B;
  font-weight: bold;
}
input {
  height: 2em;
  font-size: 1em;
  padding-left: .4em;
}
button {
  margin-top: 20px;
  font-family: Arial;
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer; cursor: hand;
}
button:hover {
  background-color: #cfd8dc;
}
button:disabled {
  background-color: #eee;
  color: #ccc; 
  cursor: auto;
}
```

### Style the Navigation Links - Add a `app.component.css`
``` CSS
h1 {
  font-size: 1.2em;
  color: #999;
  margin-bottom: 0;
}
h2 {
  font-size: 2em;
  margin-top: 0;
  padding-top: 0;
}
nav a {
  padding: 5px 10px;
  text-decoration: none;
  margin-top: 10px;
  display: inline-block;
  background-color: #eee;
  border-radius: 4px;
}
nav a:visited, a:link {
  color: #607D8B;
}
nav a:hover {
  color: #039be5;
  background-color: #CFD8DC;
}
nav a.active {
  color: #039be5;
}
```

> The `routerLinkActive` directive

>> The Angular Router provides a `routerLinkActive` directive we can use to add a class to the HTML navigation element whose route matches the active route. All we have to do is define the style for it. Sweet!

In `app/app.component.ts (active router links)`
``` HTML
<a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
<a [routerLink]="['/heroes']" routerLinkActive="active">Heroes</a>
```

## Global application styles - We can also create styles at the application level outside of any component.


In `styles.css (app styles excerpt)`
``` CSS
/* Master Styles */
h1 {
  color: #369; 
  font-family: Arial, Helvetica, sans-serif;   
  font-size: 250%;
}
h2, h3 { 
  color: #444;
  font-family: Arial, Helvetica, sans-serif;   
  font-weight: lighter;
}
body { 
  margin: 2em; 
}
body, input[text], button { 
  color: #888; 
  font-family: Cambria, Georgia; 
}
/* . . . */
/* everywhere else */
* { 
  font-family: Arial, Helvetica, sans-serif; 
}
```













