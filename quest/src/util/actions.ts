export class StartGreet{
    readonly type = 'START_GREET';
};
export class EndGreet{
    readonly type = 'END_GREET';
};
export class StartTask {
    readonly type = 'START_TASK';
    constructor (public i: number) {}
};
export class EndTask {
    readonly type = 'END_TASK';
}
export class Congratulate {
    readonly type = 'CONGRATULATE';
};
export class GiveReward {
    readonly type = 'GIVE_REWARD';
};

export type Action = StartGreet | EndGreet | StartTask | EndTask | Congratulate | GiveReward;