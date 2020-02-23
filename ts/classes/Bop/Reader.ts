import { bopOutput } from '../../contractOutputs'
import { TokenReader } from 'pollenium-toadflax'
import { ContractReaderChildStruct } from 'pollenium-clover'
import { Address } from 'pollenium-buttercup'

export class BopReader extends TokenReader {

  constructor(struct: ContractReaderChildStruct) {
    super({
      ...bopOutput,
      ...struct
    })
  }

  async fetchAlchemillaEngine(): Promise<Address> {
    return new Address(await this.ethersContract.alchemillaEngine())
  }

}
