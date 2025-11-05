{
    // either: A or B
    interface Either {
        left: () => number;
        right: () => number;
    }

    class SimpleEither implements Either {
        constructor(private leftValue: number, private rightVaue: number) {}

        left(): number {
            return this.leftValue;
        }

        right(): number {
            return this.rightVaue;
        }
    }

    const either = new SimpleEither(3, 7);
    console.log(either.left());
    console.log(either.right());

    interface GenericEither<L, R> {
        left: () => L;
        right: () => R;
    }

    class GenericEitherImpl<L, R> implements GenericEither<L, R> {
        constructor(private leftValue: L, private rightVaue: R) {}
        left(): L {
            return this.leftValue;
        }
        right(): R {
            return this.rightVaue;
        }
    }

    const eitherGeneric = new GenericEitherImpl<number, string>(3, "seven");
    console.log(eitherGeneric.left());
    console.log(eitherGeneric.right());
}
