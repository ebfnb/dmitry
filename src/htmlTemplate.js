import {Helmet} from "react-helmet"

const helmet = Helmet.renderStatic()
export default (html='', state='_') => `
    <!DOCTYPE html>
    <html ${helmet.htmlAttributes.toString()}>
        <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
        </head>
        <body ${helmet.bodyAttributes.toString()}>
            <div id="app">${html}</div>
            <script>window.__STATE__=${JSON.stringify(state).replace(/<|>/g, '')}</script>
            <script src="./client.js"></script>
        </body>
    </html>
`