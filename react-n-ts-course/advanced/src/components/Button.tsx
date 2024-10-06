import { ComponentPropsWithoutRef } from "react";

type ButtonProps = {
    el: 'button'
} & ComponentPropsWithoutRef<'button'>

type AnchorProps = {
    el: 'a'
} & ComponentPropsWithoutRef<'a'>

export default function Button(props: ButtonProps | AnchorProps) {
    if (props.el === 'a')
        return <a className="button" {...props}/>

    return <button className="button" {...props} />
}

/*
    TYPE PREDICATE solution 
    (not the ideal one as button props are not properly typed)

    type ButtonProps = ComponentPropsWithoutRef<'a'> & {href?: string} |
        ComponentPropsWithoutRef<'button'> & {href?: never};

    function isAnchor(props: ButtonProps) : props is ComponentPropsWithoutRef<'a'> {
        return 'href' in props;
    }

    export default function Button(props: ButtonProps) {
        if (isAnchor(props))
            return <a className="button" {...props}/>

        return <button className="button" {...props} />
    }
*/