import { BigInt } from "@graphprotocol/graph-ts"
import {
  ovTokenBase as ovTokenBaseContract,
  TokenCreated as TokenCreatedEvent,
} from "../generated/ovTokenBase/ovTokenBase"
import { PairCreated as PairCreatedEvent } from "../generated/ovPairBase/ovPairBase"
import { Token, Pair } from "../generated/schema"
import { NameAsSymbolERC20 as NameAsSymbolERC20Contract } from "../generated/ovTokenBase/NameAsSymbolERC20"

export function handleTokenCreated(event: TokenCreatedEvent): void {
  let token = new Token(event.params.token.toHex())
  let contract = NameAsSymbolERC20Contract.bind(event.params.token)
  
  // Call the 'name' function on your ERC20 contract
  token.name = contract.name()

  token.address = event.params.token
  // Remove the line with 'owner' if it's not in your schema
  // token.owner = event.params.owner
  token.save()
}


export function handlePairCreated(event: PairCreatedEvent): void {
  let pair = new Pair(event.params.pair.toHex())
  let tokenAContract = NameAsSymbolERC20Contract.bind(event.params.tokenA)
  let tokenBContract = NameAsSymbolERC20Contract.bind(event.params.tokenB)
  pair.token0Name = tokenAContract.name()
  pair.token1Name = tokenBContract.name()
  pair.tokenA = event.params.tokenA
  pair.tokenB = event.params.tokenB
  pair.address = event.params.pair
  
  // Additional fields can be indexed if necessary
  pair.save()
}
