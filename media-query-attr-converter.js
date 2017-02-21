/*jshint node:true*/

function MediaQueryAttrConverter() {
}

MediaQueryAttrConverter.prototype.transform = function(ast) {
  var walker = new this.syntax.Walker();

  walker.visit(ast, function(node) {
    if (node.type === 'ElementNode') {
      const classAttr = node.attributes.find(attr => attr.name === 'class');
      let classes = classAttr.value.chars.split(' ');

      const mqAttrs = node.attributes.filter(attr => attr.name.startsWith('data-mq'));
      mqAttrs.map(attr => {
        const [_prefix, suffix] = attr.name.split('data-mq');
        const unsuffixedClasses = attr.value.chars.split(' ');
        const suffixedClasses = unsuffixedClasses.map(klass => klass + suffix);
        classes.push(...suffixedClasses);
      })

      classAttr.value.chars = classes.join(' ');
    }
  });

  return ast;
};

module.exports = MediaQueryAttrConverter;
