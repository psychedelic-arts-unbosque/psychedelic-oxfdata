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
import AnkiWordStore from '../../stores/AnkiWordStore';
import { toast } from 'react-toastify';

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

export default function CustomizedDialogs(
  {
    openDialog,
    handleClose
  }: CustomDialogProps
): ReactElement {

  const [pictures, setPictures] = React.useState<File[]>([]);

  const TOO_LARGE = "Image too large";

  const onDrop = (pictures: File[]) => {
    if(pictures){
      setPictures(pictures);
    }
  }

  const ankiWordStore= AnkiWordStore.getInstance();

  const save = () =>{
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if(e.target && e.target.result){
        ankiWordStore.image = e.target.result.toString();
      }
    };
    if(pictures.length > 0){
      const picture = pictures.pop();  
      if(picture){
        reader.readAsDataURL(picture);
      }
    }
  }

  return (
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openDialog} fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Select image
        </DialogTitle>
        <DialogContent dividers>
        <ImageUploader
                withIcon={false}
                buttonText='Choose images'
                withPreview={true}
                onChange={onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                singleImage={true}
                maxFileSize={5242880}
                fileSizeError={TOO_LARGE}
                />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => {
            save();
            handleClose()
            toast('Image saved successfully', {type: 'success'})
            }} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
  );
}
