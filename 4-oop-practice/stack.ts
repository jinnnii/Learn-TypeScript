{
    interface Stack {
        readonly size: number;
        push(item: string): void;
        pop(): string | undefined;
    }

    type StackNode = {
        readonly value: string;
        readonly next?: StackNode;
        readonly prev?: StackNode;
    };

    class StackImpl implements Stack {
        private _size: number = 0;
        private head?: StackNode;

        constructor(private capacity: number = 10) {}

        get size(): number {
            return this._size;
        }

        push(value: string): void {
            if (this.size >= this.capacity) {
                throw new Error("Stack is full!");
            }

            const node: StackNode = { value, next: this.head };
            this.head = node;
            this._size++;
        }

        pop(): string {
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

    const stack = new StackImpl();
    stack.push("allice");
    stack.push("bob");
    console.log(stack.pop()); // 2
}
