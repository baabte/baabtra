# Angular Accordion To Tab Directive

An angular directive that allows you to seamlessly integrate accordions on one breakpoint that will turn into tabs once a certain threshold is met.

### Browser Support

- IE10+ transitions
- IE9+ without transitions (todo)

## Install

Clone the repository and include it directly in your project. You can also use bower and install it as a dependency:

````
bower install angular-accordion-tabs-directive
```

Add the dependency in your Angular project dependency argument area:

```js
var app = angular.module('myApp', [
  'angular-accordion-tabs-directive'
]);
```

## Usage

Here is the general HTML used. You have two configuration options:

In the event that you want to use something besides active, you can do so by changing the value here:

```html`
data-activeClsName='differentActiveName'
```

You can set the breakpoint from mobile to desktop by using:

```html
data-transform='1000'
```

**Note: Both these parameters are required, not optional.**

## Html Structure

```html
<div class='accordion-tab-container' data-angular-accordion-tabs data-activeClsName='active' data-transform='1000'>

  <nav class='nav-tab'>
    <a class='nav-item active'>First Tab</a>
    <a class='nav-item'>Second Tab</a>
  </nav>

  <div class='tab-container'>
  <a class='tab-header active'>First Tab</a>
  <div class='tab-section active'>Your First Tab Content</div>

  <a class='tab-header'> Second Tab</a>
  <div class='tab-section'> Your Second Tab Content</div>
  </div>
</div>
```

### TODO

-Modernizr Support for those looking for transitions. Currently transitions only work IE10+

-Right now this works just fine if you reach a breakpoint on page load. I currently have a solution for automatically converting tabs to accordions and vice versa but I'm looking for a better solution. Stay tuned.
