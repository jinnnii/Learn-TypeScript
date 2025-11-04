{
    /**
     * JavaScript 
     * Primittive: number, string, boolean, null, undefined, bigint, symbol (원시)
     * Object: function, array, object
     */

    // number
    const num: number = 10;

    // string
    const str: string = 'hello';

    // boolean
    const boal: boolean = true;

    // undefined: 값이 있는지 없는지 결정되지 않은 상태
    let name: undefined; // 사용하지 않음
    // name= "hello"

    let age: number | undefined; // undefined 가능 (Optional Type)
    age = 1;
    age = undefined;

    function find(): number | undefined {
        return undefined;
    }

    // null: 값이 없다는 것이 명확히 결정된 상태
    let person: string | null; // null 가능 (Optional Type)
    person = 'hello';
    person = null;

    // unknown: 어떤 타입이든 할당 가능 (사용 지양)
    let notSure: unknown = 0;
    notSure = 'he';
    notSure = true;

    // any: 어떤 타입이든 할당 가능 (사용 지양)
    let anything: any = 0;
    anything = 'hello';
    anything = true;

    // void: 아무것도 반환하지 않는 함수의 반환 타입
    function print(): void {
        console.log('hello');
        return;
    }
    let unusable: void = undefined; // 거의 사용하지 않음

    // never: 절대 반환하지 않는 함수의 반환 타입, 주로 에러를 던질 때 사용
    function throwError(message: string): never {
        // message -> server (log)
        throw new Error(message);
        while (true) {} // 무한 루프
    }

    // object: 원시 타입을 제외한 모든 타입
    let obj: object;
    function acceptSomeObject(obj: object) {}
    acceptSomeObject({ name: 'ellie' });
    acceptSomeObject([1, 2, 3]);
    acceptSomeObject(() => {});
    // acceptSomeObject(1); // 에러 (원시 타입 불가)
}