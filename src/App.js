import Header from "./components/Header";
import Main from "./components/Main";
import {useEffect , useReducer} from 'react';
import Loader from "./components/Loader";
import Error from "./components/Error"
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";

const initialState={
  questions:[],
  //loading ready error active finished
  status:"loading"
}

function reducer(state , action){
  switch(action.type){
    case "fetchQuestions": return {...state , questions:action.payload , status:"ready"}
    case "failedToFetch" :return {...state , status:"error"}
    case "start":return {...state , status:"active"}
    default:
      throw new Error("unKnown Action");
  }
}
function App() {

  const [{questions , status} , dispatch]=useReducer(reducer , initialState);
  const questionsNumber=questions.length; 

  useEffect(()=>{
   const fetchQuestions=async()=>{
    try{
      const res=await fetch("http://localhost:8000/questions");
      const data=await res.json();
      dispatch({type:"fetchQuestions" , payload:data});
    }catch(error){
      dispatch({type:"faildedToFetch"});
    }
   }

   fetchQuestions();
  },[])

  return (
    <div className="App">
      <Header/>
      <Main>
        { status === "loading" && <Loader/>}
        {status === "error" && <Error/>}
        {status === "ready" && <StartScreen questionsNumber={questionsNumber} dispatch={dispatch}/>}
        {status === "active" && <Questions/>}

      </Main>
    </div>
  );
}

export default App;
