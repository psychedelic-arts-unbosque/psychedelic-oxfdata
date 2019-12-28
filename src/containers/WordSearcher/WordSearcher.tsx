import * as React from 'react';
import { ReactElement, BaseProps } from 'react';
import { FormGroup, Input, FormControl, InputLabel, Fab, Select, MenuItem, CardContent, Typography, Card, TextField } from '@material-ui/core';
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
import IconButton from '@material-ui/core/IconButton';

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

    const [open, setOpen] = React.useState(false);
    const [openMusic, setMusicOpen] = React.useState(false);
    const [wordSearcherViewModel, setWordSearcherViewModel] = React.useState(new WordSearcherViewModel())

    const ankiWordStore = AnkiWordStore.getInstance();

    React.useEffect(() => {
        if(ankiWordStore.lexicalCategory.length > 0 && getLexicalValues()){
            const iLexicalEntryData: ILexicalEntryData = getLexicalValues().find((current: ILexicalEntryData) => current.valueEntryCategory ===     
            ankiWordStore.lexicalCategory);
            const senses = iLexicalEntryData.entries ? iLexicalEntryData.entries[0].senses: undefined;
            if(senses){
                const senseDefinitions: string[][] = senses.map((currentSense: ISense) => currentSense.definitions);
                const senseData: string[] = senseDefinitions.reduce((previous,current ) => previous.concat(current));
                const senseMeaning = senseData.reduce((previous,current) => current ? previous.concat(`\n${current}`): previous);
                ankiWordStore.handleMeaning(senseMeaning);
            }
            ankiWordStore.handlePronunciationChange(iLexicalEntryData.pronunciations);
        }
    },[ankiWordStore.lexicalCategory])

    return(
        <WordSearcherWrapper>
            <FormGroupWrapper>
                <FormGroup row>
                    <FormControlSized>
                        <InputLabel htmlFor="flashford-word">Search word ...</InputLabel>
                        <Input 
                            id="flashford-word"
                            value={ankiWordStore.word} 
                            onChange={(event) => ankiWordStore.handleWordChange(event.target.value)}
                        />
                    </FormControlSized>
                    <Fab 
                        aria-label="search" 
                        size="medium"
                        disabled={!(ankiWordStore.word.length > 0)}
                        onClick={() => getWord(ankiWordStore.word,wordSearcherViewModel)}
                    >
                       <SearchIcon color="primary"></SearchIcon>
                    </Fab>
                </FormGroup>
                    {word ?
                     <FormControl margin="normal" fullWidth>
                        <InputLabel  htmlFor="flasford-select-lexical">Lexical type</InputLabel>
                        <Select
                            id="flasford-select-lexical"
                            value={ankiWordStore.lexicalCategory}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => ankiWordStore.handleLexicalCategory(event.target.value as string)}
                        >
                            {generateMenuOptionItems()}
                        </Select>
                    </FormControl>
                        :
                    <FormControl margin="normal">
                        <InputLabel htmlFor="flashford-lexical">Introduce the lexical value ...</InputLabel>
                        <Input
                            id="flashford-lexical"
                            value={ankiWordStore.lexicalCategory}
                            onChange={(event) => ankiWordStore.handleLexicalCategory(event.target.value)}
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
                        value={ankiWordStore.meaning}
                        onChange={(event) => ankiWordStore.handleMeaning(event.target.value)}
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
                        value={ankiWordStore.examples}
                        onChange={(event) => ankiWordStore.handleExamples(event.target.value)}
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
                    {ankiWordStore.pronunciation  ? 
                    <FormControl margin="normal" style={{width: "40%"}}>
                    <InputLabel htmlFor="flashford-audio">Choose the audio</InputLabel>
                        <Select id="flashford-audio"
                                value={ankiWordStore.audioData}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => ankiWordStore.handleSpellingSchange(event.target.value)}
                                >
                            {generateMenuAudioItems(ankiWordStore.pronunciation)}
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