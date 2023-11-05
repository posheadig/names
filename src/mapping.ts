import { BigInt } from "@graphprotocol/graph-ts"
import {
  ovTokenBase as ovTokenBaseContract,
  TokenCreated as TokenCreatedEvent,
  PairCreated as PairCreatedEvent
} from "../generated/ovTokenBase/ovTokenBase"
import { Token, Pair } from "../generated/schema"

export function handleTokenCreated(event: TokenCreatedEvent): void {
  let token = new Token(event.params.token.toHex())
  let contract = ovTokenBaseContract.bind(event.params.token)
  let nameResult = contract.try_name() // This calls the 'name' function on your ERC20 contract

  if (!nameResult.reverted) {
    token.name = nameResult.value
  }
  token.address = event.params.token
  token.save()
}

export function handlePairCreated(event: PairCreatedEvent): void {
  let pair = new Pair(event.params.pair.toHex())
  pair.tokenA = event.params.tokenA.toHex()
  pair.tokenB = event.params.tokenB.toHex()
  pair.address = event.params.pair
  // ... other fields to populate
  pair.save()
}
