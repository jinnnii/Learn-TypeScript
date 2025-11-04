{
    /**
     * Type Assertion : 권장하지 않음
     * - 개발자가 컴파일러에게 특정 값의 타입을 "단언"하는 방법
     * - 타입스크립트가 추론한 타입보다 더 구체적인 타입임을 명시
     * - 두 가지 문법 제공: angle-bracket 문법(<Type>value)과 as 문법(value as Type)
     * - 주로 any 타입을 구체적인 타입으로 변환할 때 사용
     * - 잘못된 단언은 런타임 에러를 초래할 수 있으므로, 100% 확신할 때만 사용
     */

    function jsStrFunc(): any {
        return 'hello';
    }

    const result = jsStrFunc();
    result.length; // any 타입이므로 length 속성에 대한 타입 체크 불가

    // 100% 확신할 때만 사용

    // 예시(1)
    (result as string).length; // 문자열이 아닌 경우, undefined 런타임 에러 발생
    (<string>result).length;

    // 예시(2)
    const wrong: any = 5;
    (wrong as Array<number>).push(1); // 런타임 에러 발생 가능

    // 예시(3)
    function findNumbers(): number[] | undefined {
        return undefined;
    }
    const numbers = findNumbers();
    numbers!.push(2); // !: null, undefined가 아님을 단언 (런타임 에러 발생 가능)


    const button = document.querySelector('class')!;
    button.nodeValue; // !: null, undefined가 아님을 단언 (런타임 에러 발생 가능)
}