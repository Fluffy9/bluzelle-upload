import {bluzelle, BluzelleSdk} from "@bluzelle/sdk-js";
import {memoize} from 'lodash'

export const getBz = memoize(() => bluzelle({
   url: "https://client.sentry.testnet.private.bluzelle.com:26657",
   mnemonic: process.env['INPUT_MNEMONIC'],
    gasPrice: 0.002,
    maxGas: 1000000000
}))
