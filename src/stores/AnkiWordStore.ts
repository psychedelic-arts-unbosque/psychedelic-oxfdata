import { observable, computed } from 'mobx';
import IAnkiNote from '../models/IAnkiNote';
import AnkiApi from '../service/AnkiApi';

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
}