import {bluzelle, BluzelleSdk} from "@bluzelle/sdk-js";
import {memoize} from 'lodash'

console.log(process.env['INPUT_mnemonic'])
export const getBz = memoize(() => bluzelle({
   url: "https://client.sentry.testnet.private.bluzelle.com:26657",
   mnemonic: process.env['INPUT_mnemonic'],
    gasPrice: 0.002,
    maxGas: 1000000000
}))
