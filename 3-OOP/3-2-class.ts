{
    type CoffeeCup = {
        shots: number;
        hasMilk: boolean;
    };

    class CoffeeMachine {
        static BEANS_GRAMM_PER_SHOT: number = 7; // class level
        beans: number = 0; // instance (object) level

        constructor(beans: number = 0) {
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
    }

    const machine = new CoffeeMachine(100);
    console.log(machine);

    CoffeeMachine.makeMachine(100);
}
