import Header from "./components/Header";
import Main from "./components/Main";
import {useEffect , useReducer} from 'react';

const initialState={
  questions:[],
  //loading ready error finished
  state:""
}

function reducer(state , action){
  switch(action.type){
    case "fetchQuestions": return {...state , questions:action.payload , state:"ready"}
    case "failedToFetch" :return {...state , state:"error"}
    default:
      throw new Error("unKnown Action");
  }
}
function App() {

  const [state , dispatch]=useReducer(reducer , initialState);

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
        <p>1/15 </p>
        <p>Questions</p>
      </Main>
    </div>
  );
}

export default App;
