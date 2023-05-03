export type Pronoun = 'ja' | 'ti' | 'on' | 'ona' | 'oni' | 'ono' | 'one' | 'mi' | 'vi';

export type Verb = {
    aspect: 'n' | 's', 
    subjects: NounLabel[],
    objects: {[key: string]: [Casus, string]},
    pres: string[], 
    past: string[],
    passive?: string[],
    gerund: string [],
    imperative: string[],
    extras: Extras[],
    neg?: string[]
};

export type Noun = {
    gender: Gender,
    animate: boolean,
    forms: [Declination, Declination],
    labels: NounLabel[]
};

export type VerbTaskPresent = {
    start: string,
    end: string,
    word: string,
    form: number
}

export type Declination = {
    N: string,
    G: string,
    D: string,
    A: string,
    I: string,
    L: string,
    V: string
};

export type Casus = 'N' | 'G' | 'D' | 'A' | 'I' | 'L' | 'V';
export type Gender = 'm' | 'f' | 'n';
export type GrammarTaskDict = VerbTaskPresent;
export type NounLabel = 'animals' | 'food' | 'people' | 'occupation' | 'vehicle' | 'mechanism'| 'places' | 'any';

export type Adverbials = 'whereAt' | 'whereFrom' | 'whatAbout' | 'whomWith' | 'whereTo' | 'whenPresent' | 'whomTo';
export type Extras = Adverbials;