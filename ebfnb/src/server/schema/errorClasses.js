import { createError } from 'apollo-errors';
 
export const FatalError = createError('FatalError', {
  message: 'Fatal server error!'
})
export const ServerError = createError('ServerError', {
    message: 'Server error!'
})
export const CurrentUserError=createError('CurrentUser',{
    message:'Please, register'
})