import m8Server$klass from './m8/server$klass'
import htmlTemplate from './htmlTemplate'
import app$component from './app#component'
import schema,{clientSchema} from './schema'
const path = require("path")
import express from 'express'

const m8Server=m8Server$klass({schema})
const app=express()
app.use(express.static(path.join(__dirname, "dist")))
m8Server.applyMiddleware({app})
if(process.env.NODE_ENV === 'production')
    app.get('**',m8Server.ssr$getMiddleware({
        htmlTemplate,app$component,clientSchema
    }))
else if(process.env.NODE_ENV === 'development')
    app.get('**',(req,res)=>res.send(htmlTemplate()))
app.listen({ port: 3000 }, () =>
    console.log(`🚀 Server ready at http://localhost:3000${m8Server.apolloServer.graphqlPath}`)
)