{
    /**
     * Enum (열거형)
     * 관련된 상수 값들을 하나의 그룹으로 묶어서 정의하는 타입
     * 각 상수 값에 이름을 부여하며, 변하지 않는 값들을 관리할 때 유용
     * Javascript에는 없는 개념으로, TypeScript에서만 제공되는 기능
     */

    const DAYS_ENUM = Object.freeze({MONDAY: 0, TUESDAY: 1}); // Javascript 방식
    console.log(DAYS_ENUM.MONDAY);

    // TypeScript Enum 방식
    // Tips: 1. enum은 첫글자만 대문자로 작성하는 것이 관례
    //       2. enum 멤버는 기본적으로 숫자형 값(0부터 시작)을 가지며, 직접 값을 할당할 수도 있음

    enum Days { 
        MONDAY, // 0
        TUESDAY, // 1
        WEDNESDAY, // 2
        THURSDAY = 10, // 10
        FRIDAY = "fri", // "fri"
    }

    console.log(Days.MONDAY); // 0

    // ! 주의: Enum 타입의 경우, 어떤 값이 올 수 있는지 타입이 명확하지 않을 수 있으므로 (권장하지 않음)
    let day: Days = Days.WEDNESDAY;
    day = Days.MONDAY; 
    day = 10; // 가능 (주의 필요)

    // Enum 대신 Union 타입을 사용하는 것을 권장
    type DaysOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
}