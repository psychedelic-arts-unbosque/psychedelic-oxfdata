import IMessage from '../models/IMessage';
import DictionaryStore from '../stores/DictionaryStore';

export default class ChromeApiRuntime {
  private port: any = null;
  private dictionaryStore = DictionaryStore.getInstance();

  constructor(){
    //this.port = chrome.runtime.connect({name: "flashford"});
    //this.listenMessages(this.port);
  }

  sendMessage(message: IMessage){
    if(this.port){
      this.port.postMessage(message);
    }else{
      console.error("Connection is not succedd");
    }
  }

  listenMessages(port: any){
    port.onMessage.addListener((msg: IMessage) => {
      switch(msg.action){
        case 'word-definition': {
          this.dictionaryStore.setCurrentWord(msg.message);
          break;
        }
        default:  {
          console.log("non existent message")
          break;
        }
      }
    });

    
  
  }
}