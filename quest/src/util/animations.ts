export const CONFETTI_DURATION = 3;
export const START_DURATION = 8;
//const CONFETTI_DURATION = 1;
//const START_DURATION = 1;
const SLIDE_DURATION = 0.5;
const FINAL_SLIDE = 9;

const SLIDE_TO_LEFT = {
    opacity: [1, 1, 0], 
    x: ['0%', '10%', '-100%'],
    transition: { duration: SLIDE_DURATION, times: [0, 0.3, 1] }
}

export const animations : {[key: string] : any} = {
    content: {
        'greeting-enter1': {
            opacity: [0, 1, 1, 1],
            scale: [0, 1.2, 0.9, 1],
            transition: { duration: START_DURATION / 5, times: [0, 0.25, 0.35, 1]}
        },
        'greeting-enter2': {
            rotate: [0, -10, 10, -10, 10, -10, 10, 0],
            transition: { duration: START_DURATION / 20}
        },
        'greeting-enter3': {
            scale: [1, 0.95, 1.2, 0.85, 1.2, 0.85, 1.2, 0.85, 1.1, 0.9, 1],
            transition: {duration: START_DURATION / 2, times: [0, 0.05, 0.20, 0.25, 0.40, 0.45, 0.60, 0.65, 0.80, 0.85, 1]}
        },
        'greeting-enter4': {
            y: [0, -20, 20, -20, 20, -20, 0],
            transition: { duration: START_DURATION / 20}
        },
        'greeting-enter5': {
            scale: [1, 1.1, 0.9, 1],
            transition: { duration: START_DURATION / 5}
        },
        'greeting-exit': {
            ...SLIDE_TO_LEFT
        },
        'task-enter': {
            opacity: [0, 0.5, 1], 
            x: ['100%', '-20%', '0%'],
            transition: {duration: SLIDE_DURATION}
        },
        'task-exit': {
            ...SLIDE_TO_LEFT
        },
        'congrats-show': {
            opacity: [0, 1],
            scale: [0, 1.2],
            transition: { duration: FINAL_SLIDE / 13 }
        },
        'congrats-animate': {
            scale: [1.2, 0.8, 1.2],
            transition: { duration: FINAL_SLIDE / 13 * 2 }
        },
        'congrats-end': {
            scale: [1.2, 0],
            transition: { duration: FINAL_SLIDE / 13 }
        },
        'reward' : {
            opacity: [0, 1, 1],
            scale: [0, 1.2, 1],
            transition: { duration: SLIDE_DURATION}
        }
    },
    confetti: {
        'visible': {
            opacity: [0, 1, 1, 0],
            transition: {duration: CONFETTI_DURATION, times: [0, 0.3, 0.7, 1] }
        }
    },
    fireworks: {
        'visible': {
            opacity: [0, 1, 1, 0],
            transition: { duration: FINAL_SLIDE, times: [0, 0.1, 0.9, 1]}
        }
    },
    input: {
        x: [0, -10, 10, -10, 5, -5, 0],
        transition: {duration: 0.3}
    }
};

