export type State = 'launcher' | 'greeting-enter' | 'greeting-exit' |'task-enter' | 'task-exit' | 'congrats' | 'reward';

export type Task = {
    pic: string,
    task: string,
    solution: string[]
}
