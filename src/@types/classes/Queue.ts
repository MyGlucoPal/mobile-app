export default class Queue <T> {
    #head: Node<T> | null;
    #tail: Node<T> | null;
    #size: number;
    
    constructor() {
        this.#head = this.#tail = null;
        this.#size = 0;
    }

    /**
     * Insert data into the queue in First In, First Out (FIFO) order
     * 
     * @param data information we want to store in the queue
     */
    enqueue(data: T): void {
        var newNode =  new Node(data);
        if (!this.#head || !this.#tail){
            this.#head = newNode;
            this.#tail = this.#head;
        } else {
            this.#tail.nextNode = newNode;
            this.#tail = this.#tail.nextNode;
        }
        this.#size++;
    }

    /**
     * Removes the head of the queue and returns its data if available
     * 
     * @returns `T` data if queue is not empty, else return undefined
     */
    deque():T | undefined {
        if (!this.#head){
            return undefined;
        }
        var data = this.#head.data;
        this.#head = this.#head.nextNode;
        if (this.#head == null){
            this.#tail = null;
        }
        this.#size--;
        return data;
    }

    /**
     * Checks if the queue is empty
     * 
     * @returns true if the queue is empty
     */
    isEmpty(): boolean {
        return this.#head === null;
    }

    /**
     * 
     * @returns the front element in the queue,
     */
    peek(): T | undefined {
        return (this.#head) ? this.#head.data : undefined;
    }

    /**
     * Getter for the global size of the queue
     * 
     * @returns total ammount of nodes in the queue
     */
    getSize(): number{
        return this.#size;
    }
}

class Node <T> {
    data: T;
    nextNode: Node<T> | null;

    constructor(data: T) {
        this.data = data;
        this.nextNode = null;
    }
}