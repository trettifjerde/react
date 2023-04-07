import { useEffect, useState } from 'react';

let globalState = {};
let listeners = [];
let actions = {};

export const initStore = (acts, initState) => {
    if (initState)
        globalState = {...globalState, ...initState};
    if (acts) 
        actions = {...actions, ...acts};
}

const useStore = (shouldListen=true) => {
    const [state, setState] = useState(globalState);

    const dispatch = (actionId, payload) => {
        const newState = actions[actionId](globalState, payload);
        globalState = {...globalState, ...newState};

        listeners.forEach(li => li(globalState))
    }
    
    useEffect(() => {
        if (shouldListen) {
            listeners.push(setState);
            return () => listeners = listeners.filter(li => li !== setState);
        }
    }, [setState, shouldListen]);

    return [globalState, dispatch];
}

export default useStore;