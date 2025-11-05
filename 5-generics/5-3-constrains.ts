{
    /**
     * Constraints
     * - 제네릭 타입에 제약을 걸어서 특정 인터페이스를 구현한 타입만 인자로 받을 수 있도록 함
     * - 제네릭을 사용하는 함수에서 인자로 받은 타입의 세부적인 메서드나 속성에 접근할 수 있도록 함
     */

    interface Employee {
        pay(): void;
    }

    class FulltimeEmployee implements Employee {
        pay(): void {
            console.log("fulltime!!");
        }

        workFulltime(): void {}
    }

    class ParttimeEmployee implements Employee {
        pay(): void {
            console.log("parttime!!");
        }

        workParttime(): void {}
    }

    // !! 세부적인 타입을 인자로 받아서 추상적이 타입으로 다시 리턴하는 함수는 권장하지 않음
    function payBad(employee: Employee): Employee {
        employee.pay();
        return employee;
    }

    function payGood<T extends Employee>(employee: T): T {
        employee.pay();
        return employee;
    }

    const jang = new FulltimeEmployee();
    const bob = new ParttimeEmployee();

    const jangAfterPay = payBad(jang);
    const bobAfterPay = payBad(bob);

    // Emplyee 인터페이스에는 세부 메서드가 없기 때문에 오류 발생
    // jangAfterPay.workFulltime();

    // 방법1. as 키워드 사용 (권장하지 않음)
    const jangAfterPay2 = payBad(jang) as FulltimeEmployee; //

    // 방법2. 제네릭 사용 (권장)
    const bobAfterPay2 = payGood(bob);
    bobAfterPay2.workParttime();

    const obj = {
        name: "alice",
        age: 27,
    };

    function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
        return obj[key];
    }

    console.log(getValue(obj, "name")); // alice
    console.log(getValue(obj, "age")); // 20
    // console.log(getValue(obj, "animal"));
}
