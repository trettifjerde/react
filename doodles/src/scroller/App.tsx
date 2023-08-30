import './global.css';
import React, { createRef, useState, forwardRef } from 'react';

const data = [
    {
        title: 'Some title',
        content: 'Some content'
    },
    {
        title: 'Some title 2',
        content: 'Some content 2'
    },
    {
        title: 'Some title 3',
        content: 'Some content 3'
    },
    {
        title: 'Some title 4',
        content: 'Some content 4'
    }
]

type SectionPropsType = {
    title: string,
    content: string,
    scrollToNext: (() => void ) | null
};

const Section = forwardRef<HTMLDivElement, SectionPropsType>(function Section({title, content, scrollToNext}, ref) {
    return <section className='section' ref={ref}>
        <h2>{title}</h2>
        <p>{content}</p>
        <div className="form-group">
            {scrollToNext && <button type="button" onClick={scrollToNext}>Scroll to next</button> }
        </div>
    </section>
})

export default function App() {
    const [refs] = useState(data.map(entry => createRef<HTMLDivElement>()));

    const scrollToNext = (i: number) => {
        refs[i].current?.scrollIntoView({behavior: 'smooth'});
    }

    return <div>
        {data.map((entry, i) => <Section key={i} title={entry.title} content={entry.content} 
            ref={refs[i]} scrollToNext={i < refs.length - 1 ? () => scrollToNext(i + 1) : null}/>)}
    </div>
}