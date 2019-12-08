import * as React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ImageUploader from 'react-images-upload';
import { ReactElement } from 'react';
import { FormControl, InputLabel, Input } from '@material-ui/core';
import AnkiWordStore from '../../stores/AnkiWordStore';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

type CustomDialogProps = React.BaseProps & {
  openDialog: boolean,
  handleClose: () => void
}

export default function MusicDialog(
  {
    openDialog,
    handleClose
  }: CustomDialogProps
): ReactElement {

  const [srcAudio, setSrcAudio] = React.useState('');
  const [audio, setAudio] = React.useState();

  const cleanUI = (): void => {
    setSrcAudio('');
    setAudio(undefined);
}

const ankiWordStore= AnkiWordStore.getInstance();

const save = () =>{
  if(audio){
    ankiWordStore.audio = audio.toString();
  }else{
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      ankiWordStore.audio = srcAudio;
    };
  }
}

  return (  
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openDialog} fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={() => {
            handleClose()
            cleanUI()
            }}>
            Music picker
        </DialogTitle>
        <DialogContent dividers>
            <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="src-audio" >Audio src</InputLabel>
                <Input id="src-audio" type="text" value={srcAudio} onChange={(event) => setSrcAudio(event.target.value)}></Input>
            </FormControl>
            {srcAudio ? <audio src={srcAudio} controls></audio>:<> </>}
            <ImageUploader 
                withIcon={false}
                buttonText='Choose audio'
                imgExtension={['.mp3', '.avi', '.mp4']}
                label='File accepted: .mp3, .avi, .mp4'
                onChange={(fileEvent: File[]) => {
                    const reader = new FileReader();
                    reader.onload = (e: ProgressEvent<FileReader>) => {
                        if(e.target) {
                          setAudio(e.target.result);
                        }
                    };
                    if(fileEvent && fileEvent.length > 0) {
                        const file = fileEvent.pop();
                        if(file){ 
                          reader.readAsDataURL(file);
                        }
                    }

                }}
            />
            {audio ? <audio src={audio} controls></audio>:<> </>}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => {
            save()
            handleClose()}} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
  );
}
