{
    /**
     * 추상화 (Abstraction)
     * - 불필요한 부분을 숨기고, 중요한 부분만 노출하는 것
     * - 복잡한 시스템을 단순하게 만들고, 사용자가 쉽게 이해하고 사용할 수 있도록 도와줌
     */

    type CoffeeCup = {
        shots: number;
        hasMilk: boolean;
    };

    /**
     * Interface : 외부에 노출할 메서드와 속성을 정의
     * - 구현(Implementation)과 분리하여, 사용자는 인터페이스만 알면 됨
     * - 다형성(Polymorphism) 지원
     * - 코드의 유연성과 확장성 증가
     *
     * [네이밍 방법]
     * 보통 'I' 접두사를 붙여서 Interface임을 명시 (예: ICoffeeMaker)하거나,
     * Class 에서 'Impl' 접미사를 붙여서 구현체임을 명시 (예: CoffeeMakerImpl)
     */
    interface CoffeeMaker {
        makeCoffee(shots: number): CoffeeCup;
    }

    interface CommercialCoffeeMaker {
        fillCoffeeBeans(beans: number): void;
        makeCoffee(shots: number): CoffeeCup;
        clean(): void;
    }

    class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
        private static BEANS_GRAMM_PER_SHOT: number = 7; // class level
        private beans: number = 0; // instance (object) level

        private constructor(beans: number = 0) {
            // 외부에서 new로 객체 생성 불가 > static 메서드로만 객체 생성하도록 유도
            this.beans = beans;
        }

        static makeMachine(beans: number): CoffeeMachine {
            return new CoffeeMachine(beans);
        }

        grindBeans(shots: number) {
            console.log(`grinding beans for ${shots}`);
            if (this.beans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT) {
                throw new Error("not enough coffee beans!");
            }
            this.beans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
        }

        preheat() {
            console.log("heating up...");
        }

        extract(shots: number): CoffeeCup {
            console.log(`pulling ${shots} shots...`);
            return {
                shots,
                hasMilk: false,
            };
        }

        makeCoffee(shots: number): CoffeeCup {
            this.grindBeans(shots);
            this.preheat();
            return this.extract(shots);
        }

        fillCoffeeBeans(beans: number) {
            if (beans < 0) {
                throw new Error("value for beans should be greater than 0");
            }
            this.beans += beans;
        }

        clean(): void {
            console.log("cleaning the machine...");
        }
    }

    const maker: CommercialCoffeeMaker = CoffeeMachine.makeMachine(100);
    // 방법 1. private 메서드를 사용하여 복잡한 내부 과정을 숨기고, makeCoffee 메서드만 노출
    // 방법 2. interface를 사용하여 외부에 노출할 메서드와 속성을 정의
    maker.fillCoffeeBeans(32);
    const coffee = maker.makeCoffee(2); // 사용자는 makeCoffee 메서드만 알면 된다.

    class AmateurUser {
        constructor(private machine: CoffeeMaker) {} // CoffeeMaker 인터페이스만 알면 됨
        makeCoffee() {
            const coffee = this.machine.makeCoffee(2);
            console.log(coffee);
        }
    }

    class ProBarista {
        constructor(private machine: CommercialCoffeeMaker) {} // CommercialCoffeeMaker 인터페이스만 알면 됨

        makeCoffee() {
            const coffee = this.machine.makeCoffee(2);
            console.log(coffee);
            this.machine.fillCoffeeBeans(45);
            this.machine.clean();
        }
    }
}
