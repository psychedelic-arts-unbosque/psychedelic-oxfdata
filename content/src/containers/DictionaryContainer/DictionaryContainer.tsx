import * as React from "react";
import { ReactElement } from 'react';
import { Dialog, Button, DialogTitle, DialogContentText, DialogContent, DialogActions, Container, CardActions, CardContent, Card } from '@material-ui/core';
import WordSearcher from "../WordSearcher/WordSearcher";
import { observer } from 'mobx-react';
import DictionaryStore from '../../stores/DictionaryStore';
import AnkiWordStore from '../../stores/AnkiWordStore';

const DictionaryContainer = observer((): ReactElement => {

    const dictionaryStore = DictionaryStore.getInstance();
    const ankiWordStore= AnkiWordStore.getInstance();
  
    return (
      <div>
        <Card>
          <CardContent>
            <h2>{"Use Flashford for Anki?"}</h2>
            <WordSearcher word={dictionaryStore.getWord}></WordSearcher>
          </CardContent>
          <CardActions>
            <Button onClick={() => {
              if(ankiWordStore.word && ankiWordStore.lexicalCategory && ankiWordStore.meaning){
                ankiWordStore.saveCurrentWord();
            }else{
                alert("Please fill all fields")
            }
              }} variant="contained" color="primary" autoFocus fullWidth>
              Save
          </Button>
          </CardActions>
        </Card>
      </div>
    );
});

@observer
class DictionaryComponent extends React.Component{
  render(){
    return(<DictionaryContainer  />)
  }

}

export {DictionaryComponent};