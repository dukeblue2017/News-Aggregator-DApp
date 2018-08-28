## Design patterns

For the sake of keeping things clear, the logic for the DApp as it currently stands lives in one smart contract. The only exception to this is that it does inherit from one EthPM package (Zeppelin), which enables Pull Payments (though this functionality has not yet been integrated into the UI).

The submitted article information lives in an Article struct, which is in turn stored in a mapping called submissions, where it can be references in constant time in a read operation by making a call to the getter created by `submissions` being a public variable.

I make use of a few modifiers to check that no operations occur out of order, and preserve the index of the user's address in the submitters array so that there can be a way of iterating through all of the submissions despite the fact that they are in a mapping (to be used when the aggregator functions of the DApp are implemented).