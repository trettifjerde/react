import { createContext, ReactNode, useContext, useReducer } from "react";
import { Session } from "../util/types";

const enum StoreActionType {
    add,
    remove
}

type StoreState = {
    sessions: Session[]
}

type StoreAction = {
    type: StoreActionType.add,
    session: Session
} | {
    type: StoreActionType.remove,
    id: string
}

type StoreContextValue = {
    state: StoreState,
    checkIfSessionBooked: (id: string) => boolean,
    addSession: (s: Session) => void,
    removeSession: (id: string) => void
}

function storeReduser(state: StoreState, action: StoreAction) : StoreState {
    switch (action.type) {
        case StoreActionType.add:
            return {
                sessions: [...state.sessions, action.session]
            }

        case StoreActionType.remove:
            return {
                sessions: state.sessions.filter(s => s.id !== action.id)
            }
    }
}

const StoreContext = createContext<StoreContextValue | null>(null);

export default function StoreContextProvider({children}: {children: ReactNode}) {

    const [state, dispatch] = useReducer(storeReduser, {sessions: []});

    const checkIfSessionBooked = (id: string) => state.sessions.some(s => s.id === id);
    const addSession = (session: Session) => dispatch({type: StoreActionType.add, session});
    const removeSession = (id: string) => dispatch({type: StoreActionType.remove, id});

    return <StoreContext.Provider value={{
        state, checkIfSessionBooked, addSession, removeSession
    }}>
        {children}
    </StoreContext.Provider>
}

export function useStoreContext() {
    const ctx = useContext(StoreContext);

    if (ctx === null)
        throw new Error('Store context is null');

    return ctx;
}
