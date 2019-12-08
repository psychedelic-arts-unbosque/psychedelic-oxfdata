import IRegion from './IRegion';
import IRegister from './IRegister';

export default interface IPronunciation {
    audioFile?: string,
    dialets: string[],
    phoneticNotation: string,
    phoneticSpelling: string,
    regions?: IRegion[],
    registers?: IRegister[]
}