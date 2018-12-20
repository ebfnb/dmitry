import { useMutation as useRahMutation } from 'react-apollo-hooks'
import {useState} from 'react'
import handleServerErrors from '../../utils/handleServerErrors'

const useMutation=(...args)=>{
    const rahMutation=useRahMutation(...args)
    const [state,setState]=useState({
        called:false,
        loading:false,
        errors:[],
        data:undefined
    })
    const mutation=async (...args)=>{
        setState({...state,
            called:true,
            loading:true
        })
        const {errors,data}=await rahMutation(...args)
        setState({...state,data,errors,
            called:true,
            loading:false
        })
        handleServerErrors(errors)
    }
}
export default useMutation