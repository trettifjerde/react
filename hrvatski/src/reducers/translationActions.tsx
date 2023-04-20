import { Language } from "../types";

export class TransInitAction {
    readonly type = 'TRANS_INIT';
    constructor(public lang: Language, public maxQ: number) {};
};

export class TransCheckAnswer {
    readonly type = 'TRANS_CHECK';
}

export class TransSelect {
    readonly type = 'TRANS_SELECT';
    constructor(public wordId: number) {}
}

export class TransUnselect {
    readonly type = 'TRANS_UNSELECT';
    constructor(public wordId: number) {}
}

export class TransNextQuestion {
    readonly type = 'TRANS_NEXT';
}

export class TransComplete {
    readonly type = 'TRANS_COMPLETE';
}

export type TranslationAction = TransInitAction | TransCheckAnswer | TransSelect | TransUnselect | TransNextQuestion | TransComplete;