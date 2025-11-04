{
    /**
     * Type Aliases
     * - 기존 타입에 새로운 이름을 부여하는 방법
     * - 복잡한 타입을 간단하게 표현하거나, 코드의 가독성을 높이기 위해 사용
     * - interface 와 유사하지만, 더 다양한 타입(원시 타입, 유니언 타입 등)에도 적용 가능
     */
    
    type Text = string;
    const name: string = 'hello';
    const address: Text = 'world';

    type Student = {
        name: string;
        age: number;
    }
    const student: Student = {
        name: 'Alice',
        age: 20,
    };

    /**
     * String Literal Types
     * - 특정 문자열 값만을 허용하는 타입
     * - 주로 유니언 타입과 함께 사용되어, 변수나 매개변수가 가질 수 있는 값의 범위를 제한
     */
    type Name = 'name';
    let myName: Name;
    myName = 'name';
    // myName = 'hello'; // Error: 'hello'는 'name' 타입에 할당할 수 없음
    
    type Direction = 'up' | 'down' | 'left' | 'right';
    function move(direction: Direction) {
        console.log(`Moving ${direction}`);
    }
}
