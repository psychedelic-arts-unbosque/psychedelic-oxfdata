import { DictionaryProps } from '../models/DictionaryProps';
import ChromeApiRuntime from './ChromeApiRuntime';
import DictionaryStore from '../stores/DictionaryStore';

class DictionaryApi{

    private static chromeConection = new ChromeApiRuntime();
    private static dictionaryStore = DictionaryStore.getInstance();

    static getEntry(props: DictionaryProps) {
      this.chromeConection.sendMessage({
        action: 'get-word-definition',
        message: props,
      });
    }

    static getEntryUsingApp(props: DictionaryProps){

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
  
      var word = props.word;
      var domains = props.domains ? ',domains': '';
      var etymologies = props.etymologies ? ',etymologies': '';
      var examples = props.examples ? ',examples': '';
      var pronunciations = props.pronunciations ? ',pronunciations': '';
      var regions = props.regions ? ',regions': '';
      var registers =   props.registers ? ',registers': '';
      var variantForms = props.variantForms ? ',variantForms': '';
  
      var path_flashford = 'https://od-api.oxforddictionaries.com/api/v2/entries/en-us/'+word+'?fields=definitions'+domains+
      etymologies+examples+pronunciations+regions+registers+variantForms+'&strictMatch=false';
  
      xhr.open("POST", "http://ec2-107-23-129-31.compute-1.amazonaws.com:3000/word");
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      
      xhr.send(path_flashford);
    
      xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            DictionaryApi.dictionaryStore.setCurrentWord(JSON.parse(xhr.response));
          }
        }
      };
    }
}

export default DictionaryApi;