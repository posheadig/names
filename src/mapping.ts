import { SimpleToken } from '../generated/templates'
import { TokenCreated } from "../generated/MintQuest/MintQuest"
import { Token, TokenCreation } from "../generated/schema"

export function handleTokenCreated(event: TokenCreated): void {
    let token = new Token(event.transaction.hash.toHexString())
    token.address = event.params.tokenAddress
    token.owner = event.params.owner
    
    // Instantiate the token contract using the token's address
    let tokenContract = SimpleToken.bind(event.params.tokenAddress)
        
    // Fetch the name and other details
    token.name = tokenContract.name()
    token.symbol = tokenContract.symbol()
        
    token.totalSupply = BigInt.fromI32(10000) // Convert the number to BigInt
    token.kind = "Your kind value" // You might need to fetch or determine this
    token.content = "Your content value" // You might need to fetch or determine this
    token.save()


    let creation = new TokenCreation(event.transaction.hash.toHexString())
    creation.event = "TokenCreated"
    creation.token = token.id
    creation.timestamp = event.block.timestamp
    creation.save()
}
