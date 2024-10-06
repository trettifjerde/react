import { ReactNode } from "react";

type InfoBoxProps = {
    mode: 'hint',
    children: ReactNode
} | {
    mode: 'warning',
    severity: 'low' | 'medium' | 'high',
    children: ReactNode
}

export default function InfoBox(props: InfoBoxProps) {
    const {mode, children} = props;

    if (mode === 'hint') 
        return <aside className="infobox infobox-hint">
            <p>{children}</p>
        </aside>

    return <aside className={`infobox infobox-warning warning--${props.severity}`}>
        <h2>Warning</h2>
        <p>{children}</p>
    </aside>
}