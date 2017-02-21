/*jshint node:true*/

module.exports = class {
  constructor() {
    this.dataAttrPrefix = 'data-mq';
  }

  transform(ast) {
    var walker = new this.syntax.Walker();

    walker.visit(ast, (node) => {
      if (node.type === 'MustacheStatement') {
        let classes = [];
        let classKVPair;
        let presentClassKVPair = node.hash.pairs.find(kv => kv.key === 'class')

        if (presentClassKVPair) {
          classKVPair = presentClassKVPair;
          const originalClasses = classKVPair.value.value.split(' ');
          classes.push(...originalClasses);
        } else {
          const mockClassKVPair = this.mockClassKVPair();
          node.hash.pairs.push(mockClassKVPair);
          classKVPair = mockClassKVPair;
        }

        node.hash.pairs = node.hash.pairs.filter((kv) => {
          if (kv.key.startsWith(this.dataAttrPrefix)) {
            const suffixedClasses = this.generateComponentClasses(kv);
            classes.push(...suffixedClasses);
            return false;
          }
          return true;
        });

        // classKVPair.value.original = classes.join(' ').trim();
        classKVPair.value.value = classes.join(' ').trim();

      } else if (node.type === 'ElementNode') {
        let classAttr;

        const presentClassAttr = node.attributes.find(attr => attr.name === 'class');

        if (presentClassAttr) {
          classAttr = presentClassAttr;
        } else {
          const mockClassAttr = this.mockClassAttr();
          node.attributes.push(mockClassAttr);
          classAttr = mockClassAttr;
        }

        let classes;
        if (classAttr.value.chars) {
          classes = classAttr.value.chars.split(' ');
        } else {
          classes = [];
        }

        node.attributes = node.attributes.filter((attr) => {
          if(attr.name.startsWith(this.dataAttrPrefix)) {
            const suffixedClasses = this.generateElementClasses(attr);
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

  mockClassKVPair() {
    return {
      loc: this.mockLocation(),
      type: 'HashPair',
      key: 'class',
      value: '',
      original: '',
    };
  }

  generateComponentClasses(kv) {
    const [_prefix, suffix] = kv.key.split(this.dataAttrPrefix);
    const unsuffixedClasses = kv.value.value.split(' ');
    return this.generateClassNames(unsuffixedClasses, suffix);
  }

  generateElementClasses(attr) {
    const [_prefix, suffix] = attr.name.split(this.dataAttrPrefix);
    const unsuffixedClasses = attr.value.chars.split(' ');
    return this.generateClassNames(unsuffixedClasses, suffix);
  }

  generateClassNames(klasses, suffix) {
    return klasses.map(klass => klass + suffix);
  }
}
