import ILexicalEntry from './ILexicalEntry';

export default interface ILexicalEntryData extends ILexicalEntry{
  labelEntryCategory: string;
  valueEntryCategory: string;
};