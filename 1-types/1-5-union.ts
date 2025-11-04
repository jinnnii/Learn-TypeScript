{
    /**
     * Union Types: OR
     * - 여러 가능성 중 하나를 허용하는 타입
     * - 파이프 기호(|)를 사용하여 타입들을 연결
     * - 함수 매개변수, 변수 등에 다양하게 활용 가능
     */

    type Direction = 'left' | 'right' | 'up' | 'down';
    function move(direction: Direction) {
        console.log(`Moving ${direction}`);
    }
    move("up");
    // move('forward'); // Error: 'forward'는 'Direction' 타입에 할당할 수 없음

    type TileSize = 8 | 16 | 32;
    const tile: TileSize = 16;

    // function: login -> success, fail

    type SuccessState = {
        response: {
            body: string;
        }
    }
    type FailState = {
        reason: string;
    }

    type LoginState = SuccessState | FailState;
    function login(id: string, password: string): Promise<LoginState> {
        return new Promise((resolve, reject) => resolve({
            response: {
                body: 'logged in!'
            }
        }));
    }

    // printLoginState(state: LoginState)
    function printLoginState(state: LoginState) {
        // 방법 1: in 키워드 사용 (권장하지 않음)
        if( 'response' in state ) {
            console.log(`Login Success: ${state.response.body}`);
        }else{
            console.log(`Login Failed: ${state.reason}`);
        }
        
       // 방법2. Discriminated Union (권장)
    }
}