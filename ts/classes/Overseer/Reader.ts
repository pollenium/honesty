import { overseerOutput } from '../../contractOutputs'
import { ContractReader, ContractReaderChildStruct } from 'pollenium-clover'
import { OverseerStatus } from '../../OverseerStatus'
import { Address } from 'pollenium-buttercup'
import { Uu } from 'pollenium-uvaursi'

export class OverseerReader extends ContractReader {

  constructor(struct: ContractReaderChildStruct) {
    super({
      ...overseerOutput,
      ...struct
    })
  }

  async fetchAlchemillaEngine(): Promise<Address> {
    return new Address(Uu.fromHexish(await this.ethersContract.alchemillaEngine()))
  }

  async fetchBopAgree(): Promise<Address> {
    return new Address(Uu.fromHexish(await this.ethersContract.bopAgree()))
  }

  async fetchBopDisagree(): Promise<Address> {
    return new Address(Uu.fromHexish(await this.ethersContract.bopDisagree()))
  }

  async fetchStatus(): Promise<OverseerStatus> {
    return await this.ethersContract.status()
  }

}
