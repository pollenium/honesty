import { Keypair } from 'pollenium-ilex'

export const keypairs: Record<string, Keypair> = {
  engineAdmin: Keypair.generate(),
  overseerAdmin: Keypair.generate(),
  user: Keypair.generate(),
}
