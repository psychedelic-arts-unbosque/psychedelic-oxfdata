import IData from '../models/IData';
import { observable, computed, action } from 'mobx';
import ILexicalEntryData from '../models/ILexicalEntryData';
import IResult from '../models/IResult';
import ILexicalEntry from '../models/ILexicalEntry';

class DictionaryStore {

    private static instance: DictionaryStore;

    static getInstance(): DictionaryStore {
        if (!DictionaryStore.instance) {
            DictionaryStore.instance = new DictionaryStore();
        }
    
        return DictionaryStore.instance;
    }

    @observable
    word : IData | undefined = undefined;

    @observable
    words: IData[] = [];

    @computed
    get extractLexicalEntries(){
        let lexicalMapEntries = new Map<string, ILexicalEntryData[]>();

        if(this.word){
            this.word.results.forEach(({lexicalEntries}: IResult) => {
                lexicalEntries.forEach((lexicalEntry: ILexicalEntry) => {
                    const lexicalCategory = lexicalEntry.lexicalCategory;
                    let currentEntries: ILexicalEntryData[] = lexicalMapEntries.get(lexicalCategory.id);
                    
    
                    if(currentEntries){
                        const labelEntryCategory = `${lexicalCategory.text} ${currentEntries.length + 1}`;
                        const valueEntryCategory = `${lexicalCategory.id} ${currentEntries.length + 1}`;
                        currentEntries.push(
                            {
                                labelEntryCategory: labelEntryCategory,
                                valueEntryCategory: valueEntryCategory,
                                ...lexicalEntry
                            }
                        )
                    }else{
                        currentEntries = [{
                            labelEntryCategory: lexicalCategory.text,
                            valueEntryCategory: lexicalCategory.id,
                            ...lexicalEntry
                        }]
                    }
                    lexicalMapEntries.set(lexicalCategory.id, currentEntries);
                });
            });
            return Array.from(lexicalMapEntries.values())
            .reduce((previous: ILexicalEntryData[], currentValue:ILexicalEntryData[]) =>
            previous.concat(currentValue));            
        }
        return Array.from(lexicalMapEntries.values())
        .reduce((previous: ILexicalEntryData[], currentValue:ILexicalEntryData[]) =>
        previous.concat(currentValue));
    }
    
    @computed
    get getWord(){
        return this.word;
    }

    @computed
    get getCurrentWords(){
        return this.words;
    }

    @action.bound
    setCurrentWord(word: IData){
        this.word = word;
        this.words.push(word);
    }

    @action.bound
    clearWord(){
        this.word = undefined;
    }
}

export default DictionaryStore;