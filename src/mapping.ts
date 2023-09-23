import { TokenCreated } from "../generated/MintQuest/MintQuest"
import { SimpleToken } from "../generated/SimpleToken/SimpleToken"
import { Token } from "../generated/schema"

export function handleTokenCreated(event: TokenCreated): void {
    let tokenID = event.params.tokenAddress.toHexString();
    let token = new Token(tokenID);

    token.address = event.params.tokenAddress;

    // Instantiate the SimpleToken contract
    let tokenContract = SimpleToken.bind(event.params.tokenAddress);
    token.name = tokenContract.name();
    token.symbol = tokenContract.symbol();

    token.save();
}
