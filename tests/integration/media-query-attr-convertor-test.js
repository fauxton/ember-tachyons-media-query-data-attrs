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
