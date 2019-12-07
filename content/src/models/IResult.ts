import ILexicalEntry from './ILexicalEntry';

export default interface IResult {
    id: string,
    language: string,
    lexicalEntries?: ILexicalEntry[],
    type: string,
    word: string
}