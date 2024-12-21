class PriorityQueue {
    constructor() {
      this.queue = [];
    }
  
    enqueue(element, priority) {
      const qElement = { element, priority };
      let contain = false;
  
      for (let i = 0; i < this.queue.length; i++) {
        if (this.queue[i].priority > qElement.priority) {
          this.queue.splice(i, 0, qElement);
          contain = true;
          break;
        }
      }
  
      if (!contain) {
        this.queue.push(qElement);
      }
    }
  
    dequeue() {
      return this.queue.shift();
    }
  
    isEmpty() {
      return this.queue.length === 0;
    }
  }
  
  module.exports = PriorityQueue;
  