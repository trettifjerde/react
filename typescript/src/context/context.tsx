import React, {useState, useCallback} from 'react';

type SchemeColors = 'light' | 'dark';

type Scheme = {scheme: SchemeColors, toggleScheme: () => void};

const initScheme: Scheme = {scheme: 'light', toggleScheme: () => {}};

export const SchemeContext = React.createContext<Scheme>(initScheme);

const SchemeContextProvider : React.FC<{children: React.ReactNode}> = (props) => {
    const [schemeColor, setSchemeColor] = useState<SchemeColors>('light');

    const toggleScheme = useCallback(() => {
        setSchemeColor((prev) => (prev === 'light' ? 'dark' : 'light'));
    }, [setSchemeColor]);

    const context: Scheme = {scheme: schemeColor, toggleScheme: toggleScheme}

    return <SchemeContext.Provider value={context} > 
        {props.children}
    </SchemeContext.Provider>
}

export default SchemeContextProvider;