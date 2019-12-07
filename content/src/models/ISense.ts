import IDomain from './IDomain';
import ISubSense from './ISubSense';
import IPronunciation from './IPronunciation';

export default interface ISense {
    definitions: string[],
    shortDefinitions?: string[],
    domains?: IDomain[],
    id: string,
    subsenses: ISubSense[],
    pronunciations?: IPronunciation[]
}