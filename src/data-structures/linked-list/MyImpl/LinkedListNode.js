export default class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  toString(strigifier) {
    if (strigifier && typeof strigifier === 'function') {
      return strigifier(this.value);
    }
    return `${this.value}`;
  }
}
