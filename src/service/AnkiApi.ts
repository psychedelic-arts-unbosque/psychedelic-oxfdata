import IAnkiNote from '../models/IAnkiNote';
import IAnkiRequestNote from '../models/IAnkiRequestNote';
import { toast } from 'react-toastify';
import { IAnkiResponse } from '../models/IAnkiResponse';
import AnkiWordStore from '../stores/AnkiWordStore';
import DictionaryStore from '../stores/DictionaryStore';
export default class AnkiApi {

    static invoke(action: any, version: any, params={}):  Promise<any> {
        return new Promise<IAnkiResponse>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.addEventListener('error', () => {
                toast(`An unexpected error has occured`, {type: 'error'});
                reject('failed to issue request')});
            xhr.addEventListener('load', () => {
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (Object.getOwnPropertyNames(response).length !== 2) {
                        toast(`response has an unexpected number of fields`, {type: 'error'});
                        throw 'response has an unexpected number of fields';
                    }
                    if (!response.hasOwnProperty('error')) {
                        toast(`response is missing required error field`, {type: 'error'});
                        throw 'response is missing required error field';
                    }
                    if (!response.hasOwnProperty('result')) {
                        toast(`response is missing required result field`, {type: 'error'});
                        throw 'response is missing required result field';
                    }
                    if (response.error) {
                        throw response.error;
                    }
                    resolve(response.result);
                } catch (e) {
                    reject(e);
                }
            });
    
            xhr.open('POST', "https://ec2-107-23-129-31.compute-1.amazonaws.com:443/addWord");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify({action, version, params}));
        });
    }


    static async addNote({ Word, LexicalCategory, Meaning, Example, Audio, Image, phoneticSpelling, phoneticStandart}: IAnkiNote){
        const audioRequest = Audio.includes("http") ? {
            "url": Audio,
            "filename": `${Audio}_${LexicalCategory}`,
            "fields": [
                "Audio"
            ]
        }: null;

        let noteObject: IAnkiRequestNote = {
            "deckName": "English season 1 vocabulary",
            "modelName": "Professional-English",
            "fields": {
                "Word": `${Word} ${LexicalCategory}`,
                "LexicalCategory": LexicalCategory,
                "Meaning": Meaning,
                "Example": Example,
                "Audio": Audio.includes("http") ? "" : Audio  ,
                "Image": Image,
                "PhoneticSpelling": phoneticSpelling,
                "PhoneticStandart": phoneticStandart
            },
            "options": {
                "allowDuplicate": false
            },
            "tags": [
                "Flashford"
            ]
        }

        if(audioRequest){
            noteObject = {
                ...noteObject,
                "audio": audioRequest
            }
        }

        const request = {
            "action": "addNote",
            "version": 6,
            "params": {
                "note": noteObject
            }
        }

        try{
            const result: IAnkiResponse = await AnkiApi.invoke(request.action,request.version, request.params);
            toast(`Note added: ${result}`, {
                type: "success"    
            });
            AnkiWordStore.getInstance().clearWord();
            DictionaryStore.getInstance().clearWord();
        } catch (error ){
            toast(error, {type: 'error'});
        }
    }
}