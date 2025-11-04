{
    /**
     * Type Inference : 타입 추론
     * - 타입을 명시적으로 선언하지 않아도, 초기화되는 값을 보고 타입을 추론하는 기능
     * - 타입스크립트 컴파일러가 코드를 분석하여 변수, 함수 반환값 등의 타입을 자동으로 결정
     * 
     * - 원시 타입인 경우에는 생략할 수 있지만, 객체 타입인 경우에는 명시적으로 선언하는 것이 좋음
     */

    let text = 'hello'; // string 타입으로 "추론"
    // text = 1; // Error: string 타입이기 때문에 number 할당 불가

    function add(x: number, y: number) {
        return x + y; // 반환 타입이 number로 "추론"
    }
    const reuslt = add(1, 2); // reuslt는 number 타입으로 "추론"
}