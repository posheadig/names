import { TokenCreated } from "../generated/MintQuest/MintQuest"
import { Token, TokenCreation } from "../generated/schema"

export function handleTokenCreated(event: TokenCreated): void {
    let token = new Token(event.params.tokenAddress.toHexString())
    token.address = event.params.tokenAddress
    token.owner = event.params.owner
    token.name = event.params.name
    token.symbol = event.params.symbol
    token.totalSupply = TOTAL_SUPPLY
    token.kind = event.params.kind
    token.content = event.params.content
    token.save()

    let creation = new TokenCreation(event.transaction.hash.toHexString())
    creation.event = "TokenCreated"
    creation.token = token.id
    creation.timestamp = event.block.timestamp
    creation.save()
}
