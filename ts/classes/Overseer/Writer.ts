import { ContractWriter, ContractWriterChildStruct } from 'pollenium-clover'
import { overseerOutput } from '../../contractOutputs'
import { OverseerStatus } from '../../OverseerStatus'

export class OverseerWriter extends ContractWriter {
  constructor(struct: ContractWriterChildStruct) {
    super({
      ...overseerOutput,
      ...struct
    })
  }

  async setStatus(status: OverseerStatus) {
    await this.ethersContract.setStatus(status)
  }
}
