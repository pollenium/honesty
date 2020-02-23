import { Gaillardia, gaillardiaDefaults } from 'pollenium-gaillardia'
import { keypairs } from './keypairs'
import { Uu } from 'pollenium-uvaursi'
import { ETHER } from 'pollenium-weigela'

export const gaillardia = new Gaillardia({
  ...gaillardiaDefaults,
  accounts: Object.keys(keypairs).map((name) => {
    return {
      privateKey: keypairs[name].privateKey,
      startBalance: ETHER.opMul(10),
    }
  })
})
