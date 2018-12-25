import { useQuery as useRahQuery } from 'react-apollo-hooks'
import {useState} from 'react'
import handleServerErrors from 'm8-tools/lib/handleServerErrors'

const useQuery=(...args)=>{
    const {errors,...others}=useRahQuery(...args)
    handleServerErrors(errors)
    return {errors,...others}
}
export default useQuery