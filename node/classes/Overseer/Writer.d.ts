import { ContractWriter, ContractWriterChildStruct } from 'pollenium-clover';
import { OverseerStatus } from '../../OverseerStatus';
export declare class OverseerWriter extends ContractWriter {
    constructor(struct: ContractWriterChildStruct);
    setStatus(status: OverseerStatus): Promise<void>;
}
