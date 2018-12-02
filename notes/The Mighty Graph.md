So, i got stoned and it all finally clicked in. About the graph. Theres nothing but connections between server and client nodes. 
What are nodes? All these graphql endpoints. Each node has a client and a server to talk to anybody in its graphql universe where everyone speaks the same language - SDL and graphiql. browserClient is another node but it does not have a server, too expensive. But, on node server, no problem. 
So, each one of our m8 modules is a node. How do we talk to that node? We have a perfectly good way, lets make it an endpoint in our express server. 
OK, would be cool to stick these middlewares at some well known routes so our modules can talk to each other. Well, lets give each module just one route /moduleName and lets stick its middleware func on iy. No buts or ifs about it. 
How is it done? First, when is it done? When modules compose themselves into an m8 app, when m8 server is built 
import m8server from 'm8-server'
import taskComposable from 'm8-tasks'
import volunteerTaskComposable from '...'
...
const app=express()
m8server([taskComposable,taskComposable]).applyMiddleware(app).listen({port:8080},(req)=>{
    console.log(`listening on ${req.m8.url}`)
})

From there we can hook into graphical for each m8module endpoint and figure out what schema for each one looks like. We can put together a server like above super fast, get it fired up and investigate all graphicals, then, design out app without reading too much tedious hard to follow docs. We'll just see for ourselves in real life and play with the data. More then that. Each node/m8module has one or more apollo clients talking to anyone on the globe including other m8 guys in our app and somewhere else. Perhaps, other fnb sites and continously looking for other chapters to pop up in Moscow or Tejuana and say a friendly hello and let everyone here know with a hefty weight attached to notification. Everyone needs some good news. Did you hear about wires being cut in the truck.
My point is, its easy to reason about communications between modules. And we have subscriptions and we can get it all set up right in that composable exported by each module. So, heres what m8server does:

import {compose} from 'tools'
import {defaultComposable} from 'defaults'

const m8server=(listOfComposables)=>({
    applyMiddleware:(app)=>apolloServercompose([defaultComposable,...listOfComposable])
})

Server is done. Now, the compose thing:

const compose=reduce(
    ({...,context:accContext},{...generateSchema,context,name})=>({
        context:(req)=>
    }),
    {
        generateSchema:()=>
    }
)

SO, the whole local hood of m8modules nodes in our app gets rearranged at each tick of the clock. How does it tick? Each node has ots own clock ticked by requests coming in. Each node installs its own m8server