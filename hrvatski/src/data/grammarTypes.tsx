export type Pronoun = 'ja' | 'ti' | 'on' | 'ona' | 'oni' | 'ono' | 'one' | 'mi' | 'vi';

export type Verb = {
    aspect: 'n' | 's', 
    pres: string[], 
    past: string[],
    passive?: string[],
    gerund: string [],
    imperative: string[],
    extras: Extras[],
    neg?: string[]
};

export type VerbTaskPresent = {
    start: string,
    end: string,
    word: string,
    form: number
}

export type GrammarTaskDict = VerbTaskPresent;

export type Adverbials = 'whereAt' | 'whereFrom' | 'whatAbout' | 'whomWith' | 'whereTo' | 'whenPresent' | 'whomTo' | 'whom';
export type Objects = 'food' | 'people' | 'occupation';
export type Extras = Adverbials | Objects;