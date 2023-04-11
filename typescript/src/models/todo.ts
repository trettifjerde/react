export class Todo {
    id: number;
    text: string;

    constructor(textString: string) {
        this.text = textString;
        this.id = new Date().getTime() + Math.floor(Math.random() * 100);
    }
}