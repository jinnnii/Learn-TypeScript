{
    /**
     * Intersection Types : AND
     * - 여러 타입을 하나로 결합하는 방법
     * - 앰퍼샌드(&) 기호를 사용하여 타입들을 연결
     * - 객체 타입을 결합하여, 모든 속성을 포함하는 새로운 타입 생성
     */

    type Student ={
        name: string;
        score: number;
    }

    type Worker = {
        employeeId: number;
        work: () => void;
    }

    // Student 와 Worker 타입을 모두 만족하는 Intern 타입
    function internWork(person: Student & Worker) {
        // person은 Student 와 Worker 의 모든 속성을 가짐
        console.log(`Intern Name: ${person.name}`);
        console.log(`Intern Score: ${person.score}`);
        console.log(`Intern Employee ID: ${person.employeeId}`);
        person.work();
    }

    internWork({
        name: 'Alice',
        score: 95,
        employeeId: 1234,
        work: () => { console.log('Intern is working'); }
    })
}