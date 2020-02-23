import { ContractDeployer, ContractDeployerChildStruct } from 'pollenium-clover';
import { Address } from 'pollenium-buttercup';
export declare class OverseerDeployer extends ContractDeployer<Address> {
    constructor(struct: ContractDeployerChildStruct<Address>);
}
