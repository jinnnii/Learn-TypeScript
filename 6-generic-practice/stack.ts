{
    interface Stack<T> {
        readonly size: number;
        push(item: T): void;
        pop(): T | undefined;
    }

    type StackNode<T> = {
        readonly value: T;
        readonly next?: StackNode<T>;
        readonly prev?: StackNode<T>;
    };

    class StackImpl<T> implements Stack<T> {
        private _size: number = 0;
        private head?: StackNode<T>;

        constructor(private capacity: number = 10) {}

        get size(): number {
            return this._size;
        }

        push(value: T): void {
            if (this.size >= this.capacity) {
                throw new Error("Stack is full!");
            }

            const node: StackNode<T> = { value, next: this.head };
            this.head = node;
            this._size++;
        }

        pop(): T {
            if (this.head == null) {
                // null == undefined (느슨한 동등 비교)
                // null === undefined (엄격한 동등 비교)
                throw new Error("Stack is empty!");
            }

            const node = this.head;
            this.head = node.next;
            this._size--;

            return node.value;
        }
    }

    const stack = new StackImpl<string>();
    stack.push("allice");
    stack.push("bob");
    console.log(stack.pop()); // 2

    const numberStack = new StackImpl<number>();
    numberStack.push(1);
    numberStack.push(2);
}
