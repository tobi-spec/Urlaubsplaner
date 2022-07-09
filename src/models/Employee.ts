export class Employee {
    name:string; 
    password:string;
    vaccation:string[][];

    constructor(name: string, password: string) {
        this.name = name
        this.password = password
        this.vaccation = []
    }

    // check for dat formate?
    public addVacation(start: string, end:string) {
        this.vaccation.push([start, end])
    } 
}


