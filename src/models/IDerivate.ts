import IDomain from './IDomain';
import IRegion from './IRegion';
import IRegister from './IRegister';

export default interface IDerivate {
    domains: IDomain[],
    id: string,
    language: string,
    regions : IRegion[],
    registers: IRegister[]
    text: string
}