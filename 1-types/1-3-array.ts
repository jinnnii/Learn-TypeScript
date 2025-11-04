{
    // Array
    const fruits: string[] = ['Apple', 'Banana', 'Cherry']; 
    const scores: Array<number> = [100, 90, 80]; // ! Generic Array Type

    // readonly 배열 (읽기 전용 배열)
    function printArray(fruits: readonly string[]) {
        // fruits.push('Orange'); // Error: readonly 속성 때문에 변경 불가
        console.log(fruits);
    }

    // readonly Generic Array Type -> 허용하지 않음
    // function printGenericArray(scores: readonly Array<number>) {}

    function printGenericArray(scores: ReadonlyArray<number>) {
        // scores.push(100); // Error: readonly 속성 때문에 변경 불가
        console.log(scores);
    }

    // Tuple (고정된 길이와 타입을 가지는 배열) : 권장하지 않음 > interface 나 type alias, class 등으로 대체 가능
    // 1. 인덱스로 접근하는 것보다 객체로 표현하는 것이 더 명확함
    // 2. 배열 메서드를 사용할 때 문제가 발생할 수 있음
    let student: [string, number];
    student = ['Alice', 20]; // 올바른 할당
    // student = [20, 'Alice']; // Error: 타입 순서가 맞지 않음
    // student = ['Bob', 25, true]; // Error: 길이가 맞지 않음

    const [name, age] = student; // 배열 디스트럭처링
}