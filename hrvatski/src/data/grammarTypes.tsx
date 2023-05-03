export type Pronoun = 'ja' | 'ti' | 'on' | 'ona' | 'oni' | 'ono' | 'one' | 'mi' | 'vi';

export type Verb = {
    aspect: 'n' | 's', 
    subjects: symbol[],
    objects: {[key: symbol]: [Casus, string]},
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
    labels: symbol[]
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

export const nounLabels = {
    human: Symbol('human'),
    animal: Symbol('animal'),
    food: Symbol('food'),
    occupation: Symbol('occupation'),
    vehicle: Symbol('vehicle'),
    mechanism: Symbol('mechanism'),
    place: Symbol('place'),
    object: Symbol('object'),
    any: Symbol('any')
}

export type Casus = 'N' | 'G' | 'D' | 'A' | 'I' | 'L' | 'V';
export type Gender = 'm' | 'f' | 'n';
export type GrammarTaskDict = VerbTaskPresent;

export type Adverbials = 'whereAt' | 'whereFrom' | 'whatAbout' | 'whomWith' | 'whereTo' | 'whenPresent' | 'whomTo';
export type Extras = Adverbials;