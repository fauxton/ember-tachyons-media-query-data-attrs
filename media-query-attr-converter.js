/*jshint node:true*/

module.exports = class {
  mockLocation() {
    return {
      source: null,
      start: {},
      stop: {}
    };
  }

  mockClassAttr() {
    return {
      type: 'AttrNode',
      name: 'class',
      value: {
        type: 'TextNode',
        chars: '',
        loc: this.mockLocation(),
      },
      loc: this.mockLocation(),
    };
  }

  transform(ast) {
    var walker = new this.syntax.Walker();

    walker.visit(ast, (node) => {
      if (node.type === 'ElementNode') {
        let classAttr;

        const presentClassAttr = node.attributes.find(attr => attr.name === 'class');

        if (presentClassAttr) {
          classAttr = presentClassAttr;
        } else {
          const mockClassAttr = this.mockClassAttr();
          node.attributes.push(mockClassAttr);
          classAttr = mockClassAttr;
        }

        console.log({classAttr});
        let classes;
        if (classAttr.value.chars) {
          classes = classAttr.value.chars.split(' ');
        } else {
          classes = [];
        }

        node.attributes = node.attributes.filter((attr) => {
          if(attr.name.startsWith('data-mq')) {
            const [_prefix, suffix] = attr.name.split('data-mq');
            const unsuffixedClasses = attr.value.chars.split(' ');
            const suffixedClasses = unsuffixedClasses.map(klass => klass + suffix);
            classes.push(...suffixedClasses);
            return false;
          }
          return true;
        });

        classAttr.value.chars = classes.join(' ').trim();
      }
    });

    return ast;
  }
}
