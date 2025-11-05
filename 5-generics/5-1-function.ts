{
    /**
     * 제네릭 함수
     * - 다양한 타입에 대해 동작하는 함수
     * - 호출 시점에 타입을 지정
     * - 타입 안정성 제공
     */

    function checkNotNull(arg: number | null): number {
        if (arg == null) {
            throw new Error("arg is null");
        }
        return arg;
    }

    checkNotNull(123);
    // checkNotNull(null);

    function checkNotNullGeneric<T>(arg: T | null): T {
        if (arg == null) {
            throw new Error("arg is null");
        }
        return arg;
    }

    const num: number = checkNotNullGeneric<number>(123);
    const str: string = checkNotNullGeneric<string>("hello");
    const boal: boolean = checkNotNullGeneric(true); // 생략 가능
    // checkNotNullGeneric<number>(null);
}
