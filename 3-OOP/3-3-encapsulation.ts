{
    /**
     * Encapsulation
     * - 객체의 상태(필드)를 외부에서 함부로 변경하지 못하도록 막는 것
     * - public, private, protected
     * - public: 외부에서 접근 가능 (default)
     * - private: 외부에서 접근 불가
     * - protected: 상속된 자식 클래스에서만 접근 가능
     */
    type CoffeeCup = {
        shots: number;
        hasMilk: boolean;
    };

    class CoffeeMachine {
        private static BEANS_GRAMM_PER_SHOT: number = 7; // class level
        private beans: number = 0; // instance (object) level

        private constructor(beans: number = 0) {
            // 외부에서 new로 객체 생성 불가 > static 메서드로만 객체 생성하도록 유도
            this.beans = beans;
        }

        static makeMachine(beans: number): CoffeeMachine {
            return new CoffeeMachine(beans);
        }

        getCoffeeBeans(shots: number): number {
            return shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
        }

        isEnough(shots: number): boolean {
            return this.beans > this.getCoffeeBeans(shots);
        }

        consumeCoffeeBeans(shots: number) {
            this.beans -= this.getCoffeeBeans(shots);
        }

        makeCoffee(shots: number): CoffeeCup {
            if (!this.isEnough(shots)) {
                throw new Error("not enough coffee beans!");
            }

            this.consumeCoffeeBeans(shots);

            return {
                shots,
                hasMilk: false,
            };
        }

        fillCoffeeBeans(beans: number) {
            if (beans < 0) {
                throw new Error("value for beans should be greater than 0");
            }
            this.beans += beans;
        }
    }

    // const maker = new CoffeeMachine(100);
    const maker = CoffeeMachine.makeMachine(100);
    // maker.beans = -3 // 외부에서 커피콩을 마음대로 조작할 수 있다면? > 캡슐화가 깨진다.
    maker.fillCoffeeBeans(32);

    /**
     * Getters & Setters
     * - 캡슐화된 필드에 안전하게 접근할 수 있는 방법
     * - 일반 변수 처럼 사용이 가능하지만, 어떤 계산이 필요할 때 유용
     */
    class User {
        private internalAge: number = 4; // 내부에서 관리되는 나이

        get age(): number {
            // 외부에서 접근하는 나이
            return this.internalAge;
        }

        set age(num: number) {
            if (num < 0) {
                throw new Error("age must be positive number");
            }
            this.internalAge = num;
        }

        get fullName(): string {
            return `${this.firstName} ${this.lastName}`;
        }

        // 생성자 파라미터를 바로 private 필드로 선언하여 캡슐화
        constructor(private firstName: string, private lastName: string) {
            // private 필드로 캡슐화
        }
    }

    const user = new User("Steve", "Jobs");
    console.log(user.fullName); // Steve Jobs
}
