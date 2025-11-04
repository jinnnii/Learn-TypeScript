{
    // Typescript Function 
    function tsAdd(num1: number, num2: number): number {
        return num1 + num2;
    }

    // Typescript Function
    function tsFetchNum(id: string) : Promise<number>{
        // code ...
        return new Promise((resolve, reject) => {
            resolve(100);
        });
    }

    // Optional parameter (? : 있어도 되고 없어도 되는 파라미터)
    function printName(firstName: string, lastName?: string) {
        console.log(firstName);
        console.log(lastName);
    }
    printName('Steve', 'Jobs');
    printName('Ellie'); // print lastName as undefined


    // Default parameter (= : 파라미터가 없을 때 기본 값 설정)
    function printMessage(message: string = 'default message') {
        console.log(message);
    }
    printMessage(); // print 'default message'
    printMessage('hello ts'); // print 'hello ts'


    // Rest parameter (... : 여러 개의 파라미터를 배열로 전달)
    function addNumbers(...numbers: number[]): number {
        return numbers.reduce((a, b) => a + b, 0);
    }
    console.log(addNumbers(1, 2)); // 3
    console.log(addNumbers(1, 2, 3, 4, 5)); // 15

    
}