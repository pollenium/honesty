import { ContractReader, ContractReaderChildStruct } from 'pollenium-clover';
import { OverseerStatus } from '../../OverseerStatus';
import { Address } from 'pollenium-buttercup';
export declare class OverseerReader extends ContractReader {
    constructor(struct: ContractReaderChildStruct);
    fetchAlchemillaEngine(): Promise<Address>;
    fetchBopAgree(): Promise<Address>;
    fetchBopDisagree(): Promise<Address>;
    fetchStatus(): Promise<OverseerStatus>;
}
