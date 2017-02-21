import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('class-generator-test', 'ConvertDataAttrsToClasses plugin', {
  integration: true,
});

test('converts an arbitrary data-attr media query to the proper class name', function (assert) {
  this.render(hbs`<div class="bg-black" data-mq-ns="w1 ph5">Sample Div</div>`);

  assert.equal(this.$('div').attr('class'), 'bg-black w1-ns ph5-ns', 'Appends class suffix');
});
