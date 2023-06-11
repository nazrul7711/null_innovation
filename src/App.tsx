import { useEffect,useState } from "react"
import { auth } from "./firebase-config"
import { useAppDispatch,useAppSelector } from "./hook"
import { onAuthStateChanged } from "firebase/auth"
import { AuthActions } from "./store/AuthSlice"


import Signup from "./components/Signup"
import TodoForm from "./components/TodoForm"



function App (){
  const [loading,setLoading] = useState<boolean>(true)
  const user = useAppSelector(state=>state.Auth)
  const dispatch = useAppDispatch()

  useEffect(()=>{

    onAuthStateChanged(auth,(userAuth)=>{
      if(userAuth){
        dispatch(AuthActions.login({email:userAuth.email!}))
      }else{
        dispatch(AuthActions.logout())
      }
      setLoading(false)
    })

  },[])
  if (loading) {
    return (
      <h1>Loading....</h1>
    )
  }

  return (
    <>
      {!user.user ? <Signup /> : <TodoForm />}
    </>
  );
}
export default App
