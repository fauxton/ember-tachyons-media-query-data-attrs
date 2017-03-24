# tachyons-media-query-helpers

I like [tachyons](https://tachyons.io), but I sometimes find it hard to wrap my brain
around what a given element will look like at different screen sizes when all
the class names are jumbled together in my [Ember.js](https://emberjs.com) projects.
So I created this addon to help.

Instead of:

```hbs
<h1 class="f2 fw6 mb4 center w-80 f1-ns w-90-ns f1-m fw6-m w-80-m f-headline-l
           lh-solid-l w-80-l">
  Some header content
</h1>
```

I prefer separate `data-*` attrs that logically separate styles by media
queries:

```hbs
<h1 class="f2 fw6 mb4 center w-80"
    data-mq-ns="f1 w-90"
    data-mq-m="f1 fw6 w-80"
    data-mq-l="f-headline lh-solid w-80">
  Some header content
</h1>
```

This addon simply converts the data attrs into standard tachyons classes by
manipulating the Handlebars AST at build time. Class definitions on components
are also supported.

## Installation

* `git clone <repository-url>` this repository
* `cd tachyons-media-query-helpers`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
