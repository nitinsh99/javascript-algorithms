import LinkedListNode from './LinkedListNode';

export default class LinkedList {
  constructor(comparator) {
    this.head = null;
    this.tail = null;
    this.comparator = comparator;
  }

  append(value) {
    const node = new LinkedListNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    return this;
  }

  prepend(value) {
    const node = new LinkedListNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    return this;
  }

  delete(value) {
    let current = this.head;
    let deleteNode = null;

    while (current != null) {
      if (
        current === this.head
        && (current.value === value || current.value.value === value)
      ) {
        deleteNode = this.head;
        this.head = this.head.next;
        if (deleteNode === this.tail) {
          this.tail = this.head;
        }
        current = this.head;
      } else if (
        current.next != null
        && (current.next.value === value || current.next.value.value === value)
      ) {
        deleteNode = current.next;
        current.next = current.next.next;
        if (deleteNode === this.tail) {
          this.tail = current;
        }
      } else {
        current = current.next;
      }
    }

    return deleteNode;
  }

  deleteTail() {
    let current = this.head;

    if (current === this.tail) {
      const deletedTail = this.head;

      this.head = null;
      this.tail = null;
      return deletedTail;
    }
    while (current.next !== this.tail) {
      current = current.next;
    }
    const deletedTail = this.tail;
    this.tail = current;
    this.tail.next = null;
    return deletedTail;
  }

  deleteHead() {
    if (this.head === this.tail) {
      const deletedTail = this.head;

      this.head = null;
      this.tail = null;
      return deletedTail;
    }
    const deletedNode = this.head;
    this.head = this.head.next;
    return deletedNode;
  }

  toString(strigifier) {
    let res = '';
    let current = this.head;
    while (current != null) {
      res
        += strigifier && typeof strigifier === 'function'
          ? `${strigifier(current.value)}`
          : `${current.value}`;
      if (current.next != null) {
        res += ',';
      }
      current = current.next;
    }
    return res;
  }

  find(value) {
    let current = this.head;

    while (current != null) {
      if (this.comparator && typeof this.comparator === 'function') {
        if (this.comparator(current.value, value.value) === 0) {
          return current;
        }
      } else if (
        typeof value === 'object'
        && typeof value.callback === 'function'
      ) {
        if (value.callback(current.value)) {
          return current;
        }
      } else {
        if (
          current.value === value.value
          || current.value.value === value.value
        ) {
          return current;
        }
      }
      current = current.next;
    }
    return null;
  }

  fromArray(array) {
    array.forEach((el) => {
      this.append(el);
    });
  }

  reverse() {
    const recur = (node) => {
      const temp = node;
      if (temp.next === null) {
        this.head = temp;
        return temp;
      }
      const tempNext = recur(temp.next);
      tempNext.next = temp;
      return temp;
    };
    const tail = recur(this.head);
    this.tail = tail;
    this.tail.next = null;
  }
}
