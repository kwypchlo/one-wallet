# 1wallet code

First, please make sure you completed the setup script in [Quick Start](https://github.com/polymorpher/one-wallet#quick-start). If you haven't, your set up won't work on mainnet.

## Web Client

As described in [Quick Start](https://github.com/polymorpher/one-wallet#quick-start), you can start a local web client at https://localhost:3000 with:

```
cd client
yarn run dev
```

Various options are available at the webclient, for example, to enable development using a local Ethereum blockchain spawned by [Ganache](https://www.trufflesuite.com/ganache), you may run the client in DEBUG mode instead. 

``` 
# NOTE: You will need to spwan your blockchain first! Make sure it runs before you do this
DEBUG=1 yarn run dev
```

For more nuanced options, please refer to README in [`/client`](https://github.com/polymorpher/one-wallet/tree/master/code/client)

## Relayer

Relayer is a simple, intermediary REST API server that relays write-transactions from the client to the blockchain. The only two reasons we use a relayer at this time are:

- Smart contract wallet by itself is unable to pay gas until [Account Abstraction - EIP-2938](https://github.com/harmony-one/bounties/issues/35) is implemented 
- We want to make it simple for new users to create a wallet.

Running the Relayer requires setting the private-key of a funded wallet to an environment variable. For every transaction from the client that mutates the blockchain, the relayer simply forward the data of the transaction to the blockchain using its own private-key wallet. In other words, the relayer does nothing except paying for the gas of the transaction, and signing it off. 

Once Account Abstraction is implemented, the primary function of the relayer is no longer needed. It will be deprecated and left with only one function: pay for the creation of new wallets. 

The Relayer cannot intercept credentials from the client because of commit-reveal mechanism detailed in the protocol, which is already extensively discussed in Wiki and protocol, then revised and reviewed in pull requests (#56, #60) so we will not reiterate the details here.  

For details of running a Relayer locally, please refer to [README in relayer folder](https://github.com/polymorpher/one-wallet/tree/master/code/relayer)

## Smart Contract

All smart contracts are in [`/contracts`](https://github.com/polymorpher/one-wallet/tree/master/code/contracts) folder. The primary code of the wallet is [`ONEWallet.sol`](https://github.com/polymorpher/one-wallet/blob/master/code/contracts/ONEWallet.sol).

The `code` folder itself resembles directory structure of a typical Truffle project. Indeed, you can run various truffle commands under this directory. If you are unfamiliar with Truffle, please consider going through the [Truffle tutorial](https://www.trufflesuite.com/docs/truffle/overview). Reading it might take some time, but it will save you at least 10x more time in development.

### Quick Start

For a quick start, please start a local Ethereum blockchain using [Ganache](https://www.trufflesuite.com/ganache), and run the following:

```
truffle test --network=ganache
```

Truffle will connect to the blockchain and run all tests listed under [`/test`](https://github.com/polymorpher/one-wallet/tree/master/code/test). All tests should pass. If you are curious of the inner workings of the wallet, you can enable VERBOSE mode:

```
VERBOSE=1 truffle test --network=ganache
```

To use other networks, you need to set up keys in `.env` file. A sample file is provided in `.env.sample`. You don't need to fill in empty values for each field, you only need the ones that you want to use.

- `ETH_GANACHE_KEY` corresponds to `dev` network, which can also be local Ganache. It is useful if you want to use a specific account generated by Ganache for development purposes. Simply click the key icon of that account in Ganache, and copy the private key here.
- `HARMONY_MAINNET_KEY` corresponds to `harmony-mainnet` network. You can easily get one from the [Chrome Extension Wallet](https://chrome.google.com/webstore/detail/harmony-chrome-extension/fnnegphlobjdpkhecapkijjdkgcjhkib?hl=en-US) or the Harmony Go command line package.
- `HARMONY_TESTNET_KEY` corresponds to `harmony-testnet` network. Most of the time, you won't need it, because the gas on Harmony mainnet is so cheap.

You can compile the contracts by

```
truffle compile
```

If you have [`solc`](https://docs.soliditylang.org/en/v0.8.4/installing-solidity.html) installed, you can also do a quicker compile without generating binary code, by

```
./compile.sh
```

This is useful for a quick validation of the contract. The `optimize` flag is necessary to ensure the contract size is less than 24KB. 

When you modify the smart contracts (or the core library, introduced below), it is generally a good practice first validate the contract by `./compile.sh`, then to ensure all the tests can still pass using `truffle test --network=ganache` 

## Core Library

See `/lib`. README will be added soon. 
