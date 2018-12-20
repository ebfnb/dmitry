import { useQuery as useRahQuery } from 'react-apollo-hooks'
import {useState} from 'react'
import handleServerErrors from '../../utils/handleServerErrors'

const useQuery=(...args)=>{
    const {error,...others}=useRahQuery(...args)
    handleServerErrors(error)
    return {error,...others}
}
export default useQuery