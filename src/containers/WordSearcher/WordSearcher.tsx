import * as React from 'react';
import { ReactElement, BaseProps } from 'react';
import { FormGroup, Input, FormControl, InputLabel, Fab, Select, MenuItem, TextareaAutosize, TextField, Card, CardContent, Typography, CardActions, Button, IconButton, Icon } from '@material-ui/core';
import { WordSearcherWrapper, FormGroupWrapper, FormControlSized, ActionButton } from './styles';
import SearchIcon from '@material-ui/icons/Search';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import Flexbox from '../../components/Flexbox';
import { WordSearcherViewModel } from './WordSearcherViewModel';
import { observer } from 'mobx-react-lite';
import IData from '../../models/IData';
import ILexicalEntryData from '../../models/ILexicalEntryData';
import DictionaryStore from '../../stores/DictionaryStore';
import ISense from '../../models/ISense';
import IPronunciation from '../../models/IPronunciation';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import BlockIcon from '@material-ui/icons/Block';
import CustomizedDialogs from '../ImageDialog/ImageDialog';
import MusicDialog from '../MusicDialog/MusicDialog';
import AnkiWordStore from '../../stores/AnkiWordStore';

type WordSearcherProps =   BaseProps & {
    word?: IData;
    save?: () => void;
}
const dictionaryStore = DictionaryStore.getInstance();

function generateMenuOptionItems(){
    return(dictionaryStore.extractLexicalEntries.map((currentCategory: ILexicalEntryData, index) =>
        <MenuItem key={index} value={currentCategory.valueEntryCategory}>{currentCategory.labelEntryCategory}</MenuItem>))
}

function executeAudio(src: string){
    const audio = new Audio(src);
    audio.play();
}

function generateMenuAudioItems(pronunciations: IPronunciation[]){
    return(pronunciations.map(({phoneticNotation, phoneticSpelling, audioFile}, index) =>
    <MenuItem key={index} value={phoneticNotation}>
        <Card style={{width: "150px"}}>
            <CardContent style={{padding: "4px"}}>
                <Flexbox flexDirection="row">
                    <Flexbox  flexDirection="column" justifyContent="space-evenly" >
                        <Typography component="h3" color="textSecondary">
                            {phoneticNotation}
                        </Typography>
                        <Typography component="h4">
                            {phoneticSpelling}
                        </Typography>
                    </Flexbox>
                    <Flexbox>
                            {audioFile ?
                            <IconButton aria-label="play/pause" onClick={() => executeAudio(audioFile)}>
                            <PlayArrowIcon />
                            </IconButton>:
                            <IconButton>
                                <BlockIcon />
                            </IconButton>
                        }
                    </Flexbox>
                </Flexbox>
            </CardContent>
        </Card>
    </MenuItem>))
}

function getLexicalValues(){
    return dictionaryStore.extractLexicalEntries;
}

function getWord(word: string, viewModel: WordSearcherViewModel){
    viewModel.getWord(word);
}

const WordSearcher = observer(({
    word,
    save
}: WordSearcherProps): ReactElement => {

    const [wordValue, setWordValue] = React.useState('');
    const [lexicalValue, setLexicalValue] = React.useState('');
    const [meaning, setMeaning] = React.useState('');
    const [example, setExample] = React.useState('');
    const [pronunciation, setPronunciation] = React.useState<IPronunciation[]>();
    const [audio, setAudio] = React.useState<IPronunciation>();
    const [phoneticNotation, setPhoneticNotation] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [openMusic, setMusicOpen] = React.useState(false);
    const [wordSearcherViewModel, setWordSearcherViewModel] = React.useState(new WordSearcherViewModel())

    React.useEffect(()=> {
        ankiWordStore.word = wordValue;
    }, [wordValue]);
    React.useEffect(()=> {
        ankiWordStore.lexicalCategory = lexicalValue;
    }, [lexicalValue]);
    React.useEffect(()=> {
        ankiWordStore.meaning = meaning;
    }, [meaning]);
    React.useEffect(()=> {
        if(audio){
            ankiWordStore.audio =  audio.audioFile;
            ankiWordStore.phoneticSpelling = audio.phoneticSpelling;
            ankiWordStore.phoneticStandart = audio.phoneticNotation;
            setPhoneticNotation(audio.phoneticNotation);
        }
    }, [audio]);

    React.useEffect(() => {
        if(lexicalValue.length > 0 && getLexicalValues()){
            const iLexicalEntryData: ILexicalEntryData = getLexicalValues().find((current: ILexicalEntryData) => current.valueEntryCategory === lexicalValue);
            const senses = iLexicalEntryData.entries ? iLexicalEntryData.entries[0].senses: undefined;
            if(senses){
                const senseDefinitions: string[][] = senses.map((currentSense: ISense) => currentSense.definitions);
                const senseData: string[] = senseDefinitions.reduce((previous,current ) => previous.concat(current));
                const senseMeaning = senseData.reduce((previous,current) => current ? previous.concat(`\n${current}`): previous);
                setMeaning(senseMeaning);
            }
            setPronunciation(iLexicalEntryData.pronunciations);
        }
    },[lexicalValue])

    const ankiWordStore= AnkiWordStore.getInstance();

    return(
        <WordSearcherWrapper>
            <FormGroupWrapper>
                <FormGroup row>
                    <FormControlSized>
                        <InputLabel htmlFor="flashford-word">Search word ...</InputLabel>
                        <Input 
                            id="flashford-word"
                            value={wordValue} 
                            onChange={(event) => {setWordValue(event.target.value)
                                ankiWordStore.word = wordValue;}}
                        />
                    </FormControlSized>
                    <Fab 
                        aria-label="search" 
                        size="medium"
                        disabled={!(wordValue.length > 0)}
                        onClick={() => getWord(wordValue,wordSearcherViewModel)}
                        >
                       <SearchIcon color="primary"></SearchIcon>
                    </Fab>
                </FormGroup>
                    {word ?
                     <FormControl margin="normal" fullWidth>
                        <InputLabel  htmlFor="flasford-select-lexical">Lexical type</InputLabel>
                        <Select
                            id="flasford-select-lexical"
                            value={lexicalValue}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {setLexicalValue(event.target.value as string)
                                ankiWordStore.lexicalCategory = lexicalValue;}}
                        >
                            {generateMenuOptionItems()}
                        </Select>
                    </FormControl>
                        :
                    <FormControl margin="normal">
                        <InputLabel htmlFor="flashford-lexical">Introduce the lexical value ...</InputLabel>
                        <Input
                            id="flashford-lexical"
                            value={lexicalValue}
                            onChange={(event) => {setLexicalValue(event.target.value)
                                ankiWordStore.lexicalCategory = lexicalValue;
                            }}
                        />
                    </FormControl>
                    }
                <FormControl margin="normal">
                <TextField
                        id="flashford-meaning"
                        label="Type the meaning..."
                        multiline
                        rows={4}
                        rowsMax="7"
                        variant="outlined"
                        value={meaning}
                        onChange={(event) => {setMeaning(event.target.value)
                            ankiWordStore.meaning = meaning;}}
                    />
                </FormControl>
                
                <FormControl margin="normal">
                <TextField
                        id="outlined-multiline-flexible"
                        label="Type some examples..."
                        multiline
                        rows={4}
                        rowsMax="7"
                        variant="outlined"
                        value={example}
                        onChange={(event) => {setExample(event.target.value)
                            ankiWordStore.examples = example;}}
                    />
                </FormControl>
                <Flexbox flexDirection="row" justifyContent="space-evenly">
                    <ActionButton
                        onClick={() => setOpen(true)}
                        startIcon={<ImageSearchIcon />}
                        color="primary"
                    >
                        Choose image
                    </ActionButton>
                    {pronunciation  ? 
                    <FormControl margin="normal" style={{width: "40%"}}>
                    <InputLabel htmlFor="flashford-audio">Choose the audio</InputLabel>
                        <Select id="flashford-audio"
                                value={phoneticNotation}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) =>{ setAudio(pronunciation.find((currentPronun) =>
                                 currentPronun.phoneticNotation === event.target.value))}}
                                >
                            {generateMenuAudioItems(pronunciation)}
                        </Select>
                    </FormControl>: 
                    <ActionButton
                        onClick={() => setMusicOpen(true)}
                        startIcon={<AudiotrackIcon />}
                        color="primary"
                        >
                        Choose audio
                    </ActionButton>}
                </Flexbox>
            </FormGroupWrapper>
            <CustomizedDialogs openDialog={open} handleClose={() => setOpen(false)}/>
            <MusicDialog openDialog={openMusic} handleClose={() => setMusicOpen(false)}></MusicDialog>
        </WordSearcherWrapper>
    );
});

export default WordSearcher;