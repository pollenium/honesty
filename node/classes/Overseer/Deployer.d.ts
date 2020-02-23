import { ContractDeployer, ContractDeployerChildStruct } from 'pollenium-clover';
import { Uish } from 'pollenium-uvaursi';
export interface OverseerDeployStruct {
    alchemillaEngine: Uish;
    dai: Uish;
}
export declare class OverseerDeployer extends ContractDeployer<OverseerDeployStruct> {
    constructor(struct: ContractDeployerChildStruct<OverseerDeployStruct>);
}
