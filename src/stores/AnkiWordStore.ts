import { observable } from 'mobx';
import IAnkiNote from '../models/IAnkiNote';
import AnkiApi from '../service/AnkiApi';
import IPronunciation from '../models/IPronunciation';

export default class AnkiWordStore {
    private static instance: AnkiWordStore;

    static getInstance(): AnkiWordStore {
        if (!AnkiWordStore.instance) {
            AnkiWordStore.instance = new AnkiWordStore();
        }
    
        return AnkiWordStore.instance;
    }

    @observable
    word: string = ''

    @observable
    lexicalCategory: string = ''

    @observable
    meaning: string = ''

    @observable
    examples: string = ''

    @observable
    audio: string = ''

    @observable
    phoneticSpelling: string = ''

    @observable
    phoneticStandart: string = ''

    @observable
    image: string = ''

    @observable
    pronunciation: IPronunciation[];

    @observable
    audioData: IPronunciation = undefined;

    saveCurrentWord(){
        const iAnkiNote: IAnkiNote = {
            Word: this.word,
            LexicalCategory: this.lexicalCategory,
            Meaning: this.meaning,
            Example: this.examples,
            Audio: this.audio,
            Image: this.image,
            phoneticSpelling: this.phoneticSpelling,
            phoneticStandart: this.phoneticStandart
        }
        AnkiApi.addNote(iAnkiNote);
    }

    clearWord(){
        this.word = '';
        this.lexicalCategory = '';
        this.meaning = '';
        this.examples = '';
        this.audio = '';
        this.image = '';
        this.phoneticSpelling = '';
        this.phoneticStandart = '';
        this.pronunciation = undefined;
        this.audioData = undefined;
    }

    handleWordChange(word: string){
        this.word = word;
    }
    
    handleLexicalCategory(lexicalCategory: string){
        this.lexicalCategory = lexicalCategory;
    }

    handleMeaning(meaning: string){
        this.meaning = meaning;
    }

    handleExamples(examples: string){
        this.examples = examples;
    }

    handlePronunciationChange(pronunciation: IPronunciation[]){
        this.pronunciation = pronunciation;
    }

    handlePhoneticNotationChange(phoneticNotation: string){
        this.phoneticSpelling = phoneticNotation;
    }

    handleSpellingSchange(value: any){
        this.audioData = this.pronunciation.find((currentPronun) =>
        currentPronun.phoneticNotation === value);
        this.audio =  this.audioData.audioFile;
        this.phoneticSpelling = this.audioData.phoneticSpelling;
        this.phoneticStandart = this.audioData.phoneticNotation;
    }


}