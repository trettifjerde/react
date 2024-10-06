import { createContext, ReactNode, useContext, useReducer } from "react";

export type Timer = {
    name: string;
    duration: number;
}

type TimersState = {
    isRunning: boolean;
    timers: Timer[]
}

type TimersContextValue = TimersState & {
    addTimer: (timerData: Timer) => void,
    startTimers: () => void;
    stopTimers: () => void;
}

const TimersContext = createContext<TimersContextValue | null>(null);

export default function TimersContextProvider({children} : {children: ReactNode}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value : TimersContextValue = {
        ...state,
        addTimer(timer: Timer) {
            dispatch({type: TimersActionType.addTimer, timer});
        },
        startTimers() {
            dispatch({type: TimersActionType.startTimers});
        },
        stopTimers() {
            dispatch({type: TimersActionType.stopTimers});
        }
    }

    return <TimersContext.Provider value={value}>
        {children}
    </TimersContext.Provider>
}

export function useTimersContext() {
    const ctx = useContext(TimersContext);

    if (!ctx)
        throw new Error('Something went really wrong - Timers Context is null');

    return ctx;
}

type TimersAction = {
    type: TimersActionType.stopTimers
} | {
    type: TimersActionType.startTimers
} | {
    type: TimersActionType.addTimer,
    timer: Timer
}

enum TimersActionType {
    stopTimers,
    startTimers,
    addTimer
}

const initialState : TimersState = {isRunning: false, timers: []};

function reducer(state: TimersState, action: TimersAction) : TimersState {
    switch (action.type) {
        case TimersActionType.startTimers:

            return {
                ...state,
                isRunning: true
            }

        case TimersActionType.stopTimers:
            return {
                ...state,
                isRunning: false
            }

        case TimersActionType.addTimer:
            return {
                ...state,
                timers: [...state.timers, action.timer]
            }
    }
}