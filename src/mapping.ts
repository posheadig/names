import { SimpleToken } from '../generated/templates'
import { TokenCreated } from "../generated/MintQuest/MintQuest"
import { Token, TokenCreation } from "../generated/schema"

export function handleTokenCreated(event: TokenCreated): void {
    let tokenCreated = new TokenCreated(event.transaction.hash.toHexString())
    tokenCreated.tokenAddress = event.params.tokenAddress
    tokenCreated.owner = event.params.owner

    // Instantiate the token contract using the token's address
    let tokenContract = SimpleToken.bind(event.params.tokenAddress)
    
    // Fetch the name and other details
    tokenCreated.name = tokenContract.name()
    tokenCreated.symbol = tokenContract.symbol()
    
    token.totalSupply = 10000
    token.kind = event.params.kind
    token.content = event.params.content
    token.save()

    let creation = new TokenCreation(event.transaction.hash.toHexString())
    creation.event = "TokenCreated"
    creation.token = token.id
    creation.timestamp = event.block.timestamp
    creation.save()
}
