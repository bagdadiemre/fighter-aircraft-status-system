import {createContext, useReducer} from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {user: action}
    }
}