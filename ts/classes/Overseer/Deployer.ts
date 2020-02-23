import { overseerOutput } from '../../contractOutputs'
import { ContractDeployer, ContractDeployerChildStruct } from 'pollenium-clover'
import { Address } from 'pollenium-buttercup'
import { Uish } from 'pollenium-uvaursi'

export interface OverseerDeployStruct {
  alchemillaEngine: Uish,
  dai: Uish
}

export class OverseerDeployer extends ContractDeployer<OverseerDeployStruct> {

  constructor(struct: ContractDeployerChildStruct<OverseerDeployStruct>) {
    super({
      ...overseerOutput,
      ...struct,
      deployTransformer: (struct: OverseerDeployStruct) => {
        const alchemillaEngine = new Address(struct.alchemillaEngine)
        const dai = new Address(struct.dai)
        return [alchemillaEngine.uu.toPhex(), dai.uu.toPhex()]
      }
    })
  }

}
