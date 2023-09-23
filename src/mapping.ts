import { TokenCreated } from "../generated/MintQuest/MintQuest"
import { SimpleToken as SimpleTokenTemplate } from "../generated/templates"
import { Token } from "../generated/schema"

export function handleTokenCreated(event: TokenCreated): void {
    let tokenID = event.params.tokenAddress.toHexString();
    let token = new Token(tokenID);

    token.address = event.params.tokenAddress;

    // Fetching the token details
    let tokenContract = SimpleTokenTemplate.bind(event.params.tokenAddress);
    token.name = tokenContract.name();
    token.symbol = tokenContract.symbol();

    token.save();
}
