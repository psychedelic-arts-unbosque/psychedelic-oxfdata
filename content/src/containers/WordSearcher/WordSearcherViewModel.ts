import DictionaryApi from '../../service/DictionaryApi';
import ILexicalEntryData from '../../models/ILexicalEntryData';
import { observable, action } from 'mobx';

export class WordSearcherViewModel {

    getWord(word: string){
       DictionaryApi.getEntryUsingApp({word: word, definitions: true, domains: true, examples: true, pronunciations: true});
    }
} 