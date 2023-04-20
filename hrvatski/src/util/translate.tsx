import { english, croatian} from '../data/translateData';
import { Language } from '../types';
import { shuffle } from './common';

export function makeSuggestionWords(phrase: string, targetLang: Language, maxWords=4) {
    const targetDict = targetLang === 'hrv' ? croatian : english;
    const words = [...phrase.split(' ')];
    
    for (let i = 0; i < maxWords; i++) {
        const j = Math.floor(Math.random() * targetDict.length);
        words.push(targetDict[j]);
    }
    
    const extraWords = shuffle(words);

    return extraWords;
}