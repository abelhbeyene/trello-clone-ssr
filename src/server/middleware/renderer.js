import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Loadable from 'react-loadable'

// import our main App component
import App from '../../../src/client/App'
import { checkExistsWithTimeout } from '../utils'
import apiUtil from '../../../src/shared/api-utils';

const path = require('path')
const fs = require('fs')

const MANIFEST_FILE_PATH = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'build',
    'asset-manifest.json'
)
let manifest

// Avoid erros during build
checkExistsWithTimeout(MANIFEST_FILE_PATH, 5000).then(() => {
    manifest = require(MANIFEST_FILE_PATH)
})


const buildHTMLPromise = (dataFromDb) => {
    return new Promise((resolve, reject) => {
        // point to the html file created by CRA's build tool
        const filePath = path.resolve(__dirname, '..', '..', '..', 'build', 'index.html')

        fs.readFile(filePath, 'utf8', (err, htmlData) => {
            if (err) {
                console.error('err', err)
                // return res.status(404).end()
                reject(err)
            }
            const modules = []
            // render the app as a string
            const html = ReactDOMServer.renderToString(
                <Loadable.Capture report={m => modules.push(m)}>
                    <App {...dataFromDb} isServerSide={true} />
                </Loadable.Capture>
            )

            const extractAssets = (assets, chunks) =>
                Object.keys(assets)
                    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
                    .map(k => assets[k])

            // then, after Loadable.Capture
            console.log(extractAssets(manifest, modules))

            const extraChunks = extractAssets(manifest, modules).map(
                c => `<script type="text/javascript" src="${c}"></script>`
            )

            // inject the rendered app into our html and send it
            resolve(
                htmlData
                    .replace(
                        '<div id="root"></div>',
                        `<div id="root">${html}</div>`
                    )
                    .replace('</head>', `<script>window.__PRELOADED_STATE = ${JSON.stringify(dataFromDb)}</script></head>` )
                    .replace('</body>', extraChunks.join('') + '</body>')
            )
        })
    })
}

export default (req, res) => {
    App.fetchAction()
        .then((dataFromDb) => buildHTMLPromise(dataFromDb))
        .then((html) => {
            res.send(html)
        })
        .catch((err) => {
            res.serverError(err)
        })
}
