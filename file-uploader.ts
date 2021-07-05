import { BluzelleSdk } from "@bluzelle/sdk-js";
import { Lease } from "@bluzelle/sdk-js/lib/codec/crud/lease";
import { readdir } from 'fs/promises'
import { readFile } from 'fs/promises'
import { normalize } from 'path'
import { Some } from "monet";
import { getBz } from "./getBz";
const glob = require("glob");

getBz()
    .then(writeSite)

function writeSite(bz: BluzelleSdk) {
    readFiles()
        .then(files => Promise.all(files.map(file =>
            bz.db.tx.Upsert({
                creator: bz.db.address,
                uuid: process.env['INPUT_UUID'] || 'my-sitex',
                key: file.filename,
                value: file.data,
                lease: { days: 1 } as Lease,
                metadata: new Uint8Array()
            })
        )))
        .then(() => console.log('Successfully uploaded files to https://client.sentry.testnet.private.bluzelle.com:1317/crud/raw/'+(process.env['INPUT_UUID'] || 'my-sitex')+'/[your_file]'))
}

interface File {
    filename: string
    data: Buffer
}

const getSiteFilename = (name: string): string => normalize('./site/' + name);

function readFiles(): Promise<File[]> {
    return new Promise((resolve, reject) => {
        // Recursively match all files
        glob('**/*.*', { cwd: "site" }, function (err: Error, files: Array<String>) {
            if (err) { console.log("Error: ", err) }
            console.log("Files: ", files)
            resolve(Promise.all(files.map(filename =>
                Some(filename.toString())
                    .map(getSiteFilename)
                    .map(readFile)
                    .map(p => p.then(data => ({
                        filename,
                        data
                    })))
                    .join()
            )))

        })
    })

}

