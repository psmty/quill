import { ClassAttributor, Scope } from 'parchment';

class IndentAttributor extends ClassAttributor {
  add(node: HTMLElement, value: string | number) {
    const numberValue = Number(value);
    let normalizedValue = 0;
    if (!isNaN(numberValue)) {
      if (numberValue > 0) {
        normalizedValue = numberValue;
      } else if (numberValue < 0) {
        const indent = this.value(node) || 0;
        normalizedValue = indent - 1
      }
    }
    if (normalizedValue === 0) {
      this.remove(node);
      return true;
    }
    return super.add(node, normalizedValue.toString());
  }

  canAdd(node: HTMLElement, value: string) {
    return super.canAdd(node, value) || super.canAdd(node, parseInt(value, 10));
  }

  // @ts-expect-error TODO: ClassAttributor may support numbers
  value(node) {
    return parseInt(super.value(node), 10) || undefined; // Don't return NaN
  }
}

const IndentClass = new IndentAttributor('indent', 'ql-indent', {
  scope: Scope.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8],
});

export default IndentClass;
