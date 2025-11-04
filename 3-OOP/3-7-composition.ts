{
    /**
     * Composition(합성) : 여러 객체를 조합하여 새로운 기능을 만드는 것
     * - 상속보다 유연한 코드 구조를 만들 수 있음
     * - 객체 간의 결합도를 낮추고 재사용성을 높임
     * - 필요한 기능을 가진 객체를 조합하여 새로운 기능을 구현
     * - 객체 지향 설계 원칙 중 하나인 OCP(Open-Closed Principle)를 준수
     * - Favor composition over inheritance(상속보다 합성을 선호하라)
     *
     * [상속의 문제점]
     * - 단일 상속(수직)만 가능하여 기능 확장에 한계가 있음
     * - 부모 클래스의 변경이 자식 클래스에 영향을 미쳐 유지보수가 어려움
     * - 한 가지 이상의 부모 클래스를 상속할 수 없음(다중 상속 불가)
     *
     * [합성의 문제점]
     * - 객체 간의 관계가 복잡해질 수 있음
     *
     * 예시) 우유와 설탕을 동시에 넣은 커피 제조기를 만들고 싶을 때
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

        constructor(
            beans: number = 0,
            private sugar: SugarMixer = new NoSugar(),
            private milk: MilkFreamer = new NoMilk()
        ) {
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
            const coffee = this.extract(shots);
            const sugarAdded = this.sugar.makeSugar(coffee);
            return this.milk.makeMilk(sugarAdded);
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
    interface MilkFreamer {
        makeMilk(cup: CoffeeCup): CoffeeCup;
    }
    class CheapMilkSteamer implements MilkFreamer {
        private steamMilk(): void {
            console.log("steaming some milk...");
        }

        makeMilk(cup: CoffeeCup): CoffeeCup {
            this.steamMilk();
            return {
                ...cup,
                hasMilk: true,
            };
        }
    }

    class FancyMilkSteamer implements MilkFreamer {
        makeMilk(cup: CoffeeCup): CoffeeCup {
            console.log("Fancy Steaming some milk...");
            return {
                ...cup,
                hasMilk: true,
            };
        }
    }

    class ColdMilkSteamer implements MilkFreamer {
        makeMilk(cup: CoffeeCup): CoffeeCup {
            console.log("Cold Steaming some milk...");
            return {
                ...cup,
                hasMilk: true,
            };
        }
    }

    class NoMilk implements MilkFreamer {
        makeMilk(cup: CoffeeCup): CoffeeCup {
            return cup;
        }
    }

    interface SugarMixer {
        makeSugar(cup: CoffeeCup): CoffeeCup;
    }

    class CandySugarMixer implements SugarMixer {
        private getSugar(): boolean {
            console.log("getting some sugar from jar...");
            return true;
        }
        makeSugar(cup: CoffeeCup): CoffeeCup {
            const sugar = this.getSugar();
            return {
                ...cup,
                hasSugar: sugar,
            };
        }
    }

    class NoSugar implements SugarMixer {
        makeSugar(cup: CoffeeCup): CoffeeCup {
            return cup;
        }
    }

    /**
     * Dependency Injection(의존성 주입)
     */

    class CaffeLatteeMachine extends CoffeeMachine {
        constructor(
            beans: number, //
            public readonly serialNumber: string, //
            private milkFrother: MilkFreamer
        ) {
            super(beans);
        }

        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots); // 부모 클래스의 메서드 호출 (Override)
            return this.milkFrother.makeMilk(coffee);
        }
    }

    class SweetCoffeeMaker extends CoffeeMachine {
        constructor(
            beans: number, //
            private sugarMixer: SugarMixer
        ) {
            super(beans);
        }

        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots);
            return this.sugarMixer.makeSugar(coffee);
        }
    }

    // 장점: 클래스 간의 결합도를 낮추고, 재사용성 증가
    // 문제점: 클래스와 클래스 간 가까운 관계(tight coupling) 발생 > 변경 또는 대체 시, 관련 클래스도 업데이트해야하는 문제 발생
    // 해결책: 인터페이스를 통한 의존성 주입(Dependency Injection) 사용 > 느슨한 결합(loose coupling) 달성
    class SweetCaffeLatteeMachine extends CoffeeMachine {
        constructor(
            beans: number, //
            private sugarMixer: SugarMixer,
            private milkFrother: MilkFreamer
        ) {
            super(beans);
        }

        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots);
            const sugarCoffee = this.sugarMixer.makeSugar(coffee);
            return this.milkFrother.makeMilk(sugarCoffee);
        }
    }

    /**
     * Decoupling the dependencies
     */

    const cheapMilkMaker = new CheapMilkSteamer();
    const fancyMilkMaker = new FancyMilkSteamer();
    const coldMilkMaker = new ColdMilkSteamer();

    const candySugar = new CandySugarMixer();

    const latteMachine = new CaffeLatteeMachine(100, "SSSS", fancyMilkMaker);
    const sweetMachine = new SweetCoffeeMaker(100, candySugar);

    //!!  너무 많은 클래스 생성-> 하나의 클래스에서 기능 추가 구현 가능

    // 하나의 CoffeeMachine 객체에 다양한 기능 조합 가능
    const maker = new CoffeeMachine(12);
    const sugarMaker = new CoffeeMachine(12, candySugar, new NoMilk());
    const latteMaker = new CoffeeMachine(12, new NoSugar(), cheapMilkMaker);
    const sweetLatteMaker = new CoffeeMachine(12, candySugar, coldMilkMaker);
}
