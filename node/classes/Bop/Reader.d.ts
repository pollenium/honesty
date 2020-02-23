import { TokenReader } from 'pollenium-toadflax';
import { ContractReaderChildStruct } from 'pollenium-clover';
import { Address } from 'pollenium-buttercup';
export declare class BopReader extends TokenReader {
    constructor(struct: ContractReaderChildStruct);
    fetchAlchemillaEngine(): Promise<Address>;
}
