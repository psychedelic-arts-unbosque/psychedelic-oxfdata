import DictionaryApi from '../../service/DictionaryApi';

export class WordSearcherViewModel {

    getWord(word: string){
       DictionaryApi.getEntryUsingApp({word: word, definitions: true, domains: true, examples: true, pronunciations: true});
    }
} 