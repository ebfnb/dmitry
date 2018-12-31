import { useMutation as useRahMutation } from 'react-apollo-hooks'
import {useState} from 'react'
import handleServerErrors from '../../utils/handleServerErrors'

const useMutation=(mutationDoc,options={})=>{
    const rahMutation=useRahMutation(mutationDoc,options)
    const [state,setState]=useState({
        loading:false,
        called:false,
        data:null,
        error:null
    })
    const {throwErrors}=options
    const updateState=(updater)=>setState({...state,...updater})
    const mutation=(options)=>{
        updateState({
            loading:true,
            called:true
        })
        return rahMutation(options).then(
            (data)=>{
                updateState({data,
                    loading:false,
                    error:null
                })
                return data
            },
            (error)=>{
                handleServerErrors(error)
                updateState({error,
                    loading:false,
                    data:null
                })
                if(throwErrors)throw new Error(error)
            }
        )
    }
    return [mutation,state]
}
export default useMutation