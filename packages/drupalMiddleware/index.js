import {execute} from 'graphql'
import drupalSchema from './schema'

const drupalMiddleware=({userAuthToken,mockStore})=>(req,res,next)=>{
    req.drupalGraphql=(documentAST)=>{
      const context={
        userAuthToken:userAuthToken(req)
      }
      return execute(drupalSchema(mockStore),documentAST,null,context)
    }
    next()
}
export default drupalMiddleware