{
    /**
     * 다형성(Polymorphism) : 여러 형태를 가질 수 있는 능력
     * - 동일한 인터페이스를 구현하는 여러 클래스가 각기 다른 동작을 수행할 수 있음
     * - 코드의 재사용성과 유연성 증가
     */

    type CoffeeCup = {
        shots: number;
        hasMilk?: boolean;
        hasSugar?: boolean;
    };

    interface CoffeeMaker {
        makeCoffee(shots: number): CoffeeCup;
    }

    class CoffeeMachine implements CoffeeMaker {
        private static BEANS_GRAMM_PER_SHOT: number = 7; // class level
        private beans: number = 0; // instance (object) level

        constructor(beans: number = 0) {
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

    class SweetCoffeeMaker extends CoffeeMachine {
        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots);
            this.addSugar();
            return {
                ...coffee,
                hasSugar: true,
            };
        }

        addSugar(): void {
            console.log("adding sugar...");
        }
    }

    const maker = new CaffeLatteeMachine(100, "SSSS");
    maker.fillCoffeeBeans(32);
    const coffee = maker.makeCoffee(2);

    const machines: CoffeeMaker[] = [
        new CoffeeMachine(100),
        new CaffeLatteeMachine(100, "SSSS"),
        new SweetCoffeeMaker(100),
    ];

    machines.forEach((machine) => {
        console.log("----------------");
        machine.makeCoffee(1);
        // machine.clean(); // CoffeeMaker 인터페이스에 clean 메서드가 없기 때문에 호출 불가
    });
}
