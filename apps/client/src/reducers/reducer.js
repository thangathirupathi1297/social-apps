

import React,{useReducer} from "react"

import Context from './usersContext'


import axios from 'axios'
import { Children } from "react"




const initalstate={
    userprofile:{}
}

const reducer=(state,action)=>{
    switch(action.type)

    {
        case 'UserProfile':
            return{
                ...state,
                userprofile:action.payload
            }
            default:
                return state
    }
}


const Reducer =(props)=>{
    const [state, dispatch] = useReducer(reducer,initalstate)

    const userProfiles= async (id)=>{

        const response = await fetch(`/api/users/${id}`, { method: "GET" });
        const datas = await response.json();
            dispatch({
                type:'UserProfile',
                payload:datas
            })
    

       
    }


    return(
        <Context.Provider
        value={

{
    userprofile:state.userprofile,
    userProfiles,
}
}
       
        >{props.children}</Context.Provider>
    )
}

export default Reducer