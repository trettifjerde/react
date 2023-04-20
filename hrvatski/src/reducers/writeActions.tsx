import { Language } from "../types";

export class WriteInitAction {
    readonly type = 'WRITE_INIT';
    constructor(public targetLang: Language, public maxQ: number) {}
}

export class WriteCheckAction {
    readonly type = 'WRITE_CHECK';
    constructor (public input: string) {}
}

export class WriteNextAction {
    readonly type = 'WRITE_NEXT';
}

export class WriteCompleteAction {
    readonly type = 'WRITE_COMPLETE';
}


export type WriteAction = WriteInitAction | WriteNextAction | WriteCompleteAction | WriteCheckAction;