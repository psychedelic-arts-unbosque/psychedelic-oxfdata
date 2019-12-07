import IMetadata from './IMetadata';
import IResult from './IResult';
export default interface IData {
    id: string,
    metadata: IMetadata,
    results: IResult[],
    word: string,
}