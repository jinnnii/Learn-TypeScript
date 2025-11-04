{
    /**
     * Abstract Class
     *  - 인스턴스(객체) 생성 불가하고 상속을 통해서 확장하여 사용 가능
     *  - abstract 키워드 사용 (예: abstract class CoffeeMaker)
     *  - 추상 메서드(abstract method)를 가질 수 있음 (구현부가 없는 메서드)
     */

    type CoffeeCup = {
        shots: number;
        hasMilk?: boolean;
        hasSugar?: boolean;
    };

    interface CoffeeMaker {
        makeCoffee(shots: number): CoffeeCup;
    }

    abstract class CoffeeMachine implements CoffeeMaker {
        private static BEANS_GRAMM_PER_SHOT: number = 7; // class level
        private beans: number = 0; // instance (object) level

        constructor(beans: number = 0) {
            this.beans = beans;
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

        // 추상 메서드: 하위 클래스에서 반드시 구현해야 하는 메서드
        protected abstract extract(shots: number): CoffeeCup;

        makeCoffee(shots: number): CoffeeCup {
            this.grindBeans(shots);
            this.preheat();
            return this.extract(shots);
        }
    }

    class CaffeLatteeMachine extends CoffeeMachine {
        constructor(beans: number, public readonly serialNumber: string) {
            super(beans);
        }

        protected extract(shots: number): CoffeeCup {
            console.log(`pulling ${shots} shots...`);
            return {
                shots,
                hasMilk: true,
            };
        }
    }

    class SweetCoffeeMaker extends CoffeeMachine {
        protected extract(shots: number): CoffeeCup {
            console.log(`pulling ${shots} shots...`);
            return {
                shots,
                hasSugar: true,
            };
        }
    }
}
