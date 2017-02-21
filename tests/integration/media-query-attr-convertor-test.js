import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('class-generator-test', 'ConvertDataAttrsToClasses plugin', {
  integration: true,
});

test('converts an arbitrary data-attr media query to the proper class name', function (assert) {
  this.render(hbs`
    <article data-mq-l="ph1 pv3">
      <div class="bg-black" data-mq-ns="w1 ph5">Sample Div</div>
    </article>
  `);

  assert.equal(this.$('article').attr('class'), 'ph1-l pv3-l', 'Handles missing class attr');
  assert.equal(this.$('div').attr('class'), 'bg-black w1-ns ph5-ns', 'Appends class suffix');
  assert.notOk(this.$('article').attr('data-mq-l'), 'removes data attributes');
});

test('ignores elements without data-attrs or classes', function (assert) {
  this.render(hbs`
    <article id="foobar">Foo Bar</article>
  `);

  assert.notOk(this.$('article').attr('class'), 'Does not add blank class attribute');
});

test('sets expected classes on components as well', function (assert) {
  this.render(hbs`
    {{with-data-attrs class="baz" data-mq-l="foo bar"}}
  `);

  assert.equal(this.$('div').attr('class'), 'baz foo-l bar-l ember-view', 'Adds classes to component element');
});

test('sets expected classes on components without regular classes', function (assert) {
  this.render(hbs`
    {{with-data-attrs data-mq-l="foo bar"}}
  `);

  assert.equal(this.$('div').attr('class'), 'foo-l bar-l ember-view', 'Adds classes to component element w/o classes');
});

test('preserves component classes when no data-attrs present', function (assert) {
  this.render(hbs`
    {{with-data-attrs class="foo bar"}}
  `);

  assert.equal(this.$('div').attr('class'), 'foo bar ember-view', 'Adds classes to component element w/o classes');
});

test('works with addon components like `link-to`', function (assert) {
  this.render(hbs`
    {{link-to 'index' '' class="foo bar
    baz" data-mq-ns="abc"}}
  `);

  assert.equal(this.$('a').attr('class'), 'foo bar baz abc-ns ember-view', 'Adds classes to built-in components with classes');
});

test('handles component with classes across multiple lines', function (assert) {
  this.render(hbs`
    {{link-to 'index' '' class="foo bar
    baz" data-mq-ns="abc"}}
  `);

  assert.equal(this.$('a').attr('class'), 'foo bar baz abc-ns ember-view', 'Adds classes to built-in components with classes');
});
