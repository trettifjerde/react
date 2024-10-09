import {  ComponentPropsWithoutRef } from "react"
import { Link, LinkProps } from "react-router-dom";

type ButtonProps = (LinkProps | ComponentPropsWithoutRef<'button'>) & {
    textOnly?: boolean
};

type PropCasterReturnType = ({
    isAnchor: true,
    props: LinkProps
} | {
    isAnchor: false,
    props: ComponentPropsWithoutRef<'button'>
});

function castProps(p: ButtonProps) : PropCasterReturnType {
    const {textOnly, ...props} = p;
    props.className = `button ${textOnly ? 'button--text-only' : ''} ${props.className || ''}`;

    if ('to' in props)
        return {
            isAnchor: true,
            props: props as LinkProps,
        }

    return {
        isAnchor: false,
        props: props as ComponentPropsWithoutRef<'button'>,
    }
}

export default function Button(bp: ButtonProps) {
    const {isAnchor, props} = castProps(bp);

    if (isAnchor) 
        return <Link {...props} />

    else
        return <button {...props} />
}