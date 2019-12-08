import IEntry from './IEntry';
import ILexicalCategory from './ILexicalCategory';
import IPronunciation from './IPronunciation';
import IDerivate from './IDerivate';
import IGrammaticalFeature from './IGrammaticalFeature';
import INote from './INote';

export default interface ILexicalEntry {
    derivateOf?: IDerivate[],
    derivates?:  IDerivate[],
    gramaticalFeatures?: IGrammaticalFeature[]
    notes?: INote[],
    entries: IEntry[],
    language: string,
    lexicalCategory: ILexicalCategory,
    pronunciations: IPronunciation[],
    text: string
}