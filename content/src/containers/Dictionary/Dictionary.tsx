import * as React from "react";
import { ReactElement } from 'react';
import { Dialog, Button, DialogTitle, DialogContentText, DialogContent, DialogActions } from "@material-ui/core";
import WordSearcher from "../WordSearcher/WordSearcher";
import { observer } from 'mobx-react';
import DictionaryStore from '../../stores/DictionaryStore';
import AnkiWordStore from '../../stores/AnkiWordStore';

const Dictionary = observer((): ReactElement => {
    const [open, setOpen] = React.useState(true);
    const dictionaryStore = DictionaryStore.getInstance();

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const ankiWordStore= AnkiWordStore.getInstance();
  
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open alert dialog
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">{"Use Flashford for Anki?"}</DialogTitle>
          <DialogContent>
          <WordSearcher word={dictionaryStore.getWord}></WordSearcher>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <Button onClick={() => {
              if(ankiWordStore.word && ankiWordStore.lexicalCategory && ankiWordStore.meaning){
                ankiWordStore.saveCurrentWord();
            }else{
                alert("Please fill all fields")
            }
              handleClose();
              }} color="primary" autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
});

@observer
class DictionaryComponent extends React.Component{
  render(){
    return(<Dictionary  />)
  }

}

export default DictionaryComponent;