{
    /**
     * Inheritance(상속) : 기존 클래스를 확장하여 새로운 클래스 작성
     * - 코드 재사용성 증가
     * - 유지보수성 향상
     */

    type CoffeeCup = {
        shots: number;
        hasMilk: boolean;
    };

    interface CoffeeMaker {
        makeCoffee(shots: number): CoffeeCup;
    }

    class CoffeeMachine implements CoffeeMaker {
        private static BEANS_GRAMM_PER_SHOT: number = 7; // class level
        private beans: number = 0; // instance (object) level

        // !! 상속을 허용하기 위해 private -> protected 변경
        protected constructor(beans: number = 0) {
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

    class CaffeLatteeMachine extends CoffeeMachine {
        constructor(beans: number, public readonly serialNumber: string) {
            super(beans);
        }

        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots); // 부모 클래스의 메서드 호출 (Override)
            this.steamMilk();
            return {
                ...coffee,
                hasMilk: true,
            };
        }

        steamMilk(): void {
            console.log("steaming some milk...");
        }
    }

    const maker = new CaffeLatteeMachine(100, "SSSS");
    maker.fillCoffeeBeans(32);
    const coffee = maker.makeCoffee(2);
}
