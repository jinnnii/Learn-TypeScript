{
    type SuccessState = {
        result: 'success';
        response: {
            body: string;
        }
    }
    type FailState = {
        result: 'fail';
        reason: string;
    }

    type LoginState = SuccessState | FailState;

    function printLoginState(state: LoginState) {
        state.result //구분된 유니언 타입 (식별 가능한 공통 속성 활용)
        //  Discriminated Union: Union Type 을 사용할때 어떤 케이스등 공통적인 속성을 가짐으로써 타입을 구분하는 방법

        if( state.result === 'success' ) {
            console.log(`Login Success: ${state.response.body}`);
        }else{
            console.log(`Login Failed: ${state.reason}`);
        }
    }
}