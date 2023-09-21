    import { configureStore } from "@reduxjs/toolkit";
    import useReducer,{setUser,clearUser} from "./userSlice";

    const store = configureStore({
        reducer:{
            user:useReducer,
        }
    })

    export default store
    export {setUser,clearUser}