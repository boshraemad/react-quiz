import Header from "./components/Header";
import Main from "./components/Main";
import {useEffect , useReducer} from 'react';
import Loader from "./components/Loader";
import Error from "./components/Error"
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";

const initialState={
  questions:[],
  //loading ready error active finished
  status:"loading",
  index:0,
  answer:null, 
  points:0
}

function reducer(state , action){
  switch(action.type){
    case "fetchQuestions": return {...state , questions:action.payload , status:"ready"}
    case "failedToFetch" :return {...state , status:"error"}
    case "start":return {...state , status:"active"}
    case "newAnswer":
      const  question = state.questions.at(state.index);
       return {
      ...state,
      answer:action.payload,
      points: question.correctOption === action.payload ? state.points + question.points : state.points
    }
    case "nextQuestion": return {...state , answer:null , index:state.index + 1}
    default:
      throw new Error("unKnown Action");
  }
}
function App() {

  const [{questions , status , index , answer , points} , dispatch]=useReducer(reducer , initialState);
  const questionsNumber=questions.length; 

  const maxPossiblePoints=questions.reduce((prev , cur)=>{
    return prev + cur.points
  } , 0)

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
    <div className="app">
      <Header/>
      <Main>
        { status === "loading" && <Loader/>}
        {status === "error" && <Error/>}
        {status === "ready" && <StartScreen questionsNumber={questionsNumber} dispatch={dispatch}/>}
        {status === "active" && <>
          <Progress questionsNumber={questionsNumber} index={index} points={points} maxPoints={maxPossiblePoints} answer={answer}/>
          <Questions question={questions[index]} dispatch={dispatch} answer={answer}/>
          <NextButton dispatch={dispatch} answer={answer}/>
          </>}
      </Main>
    </div>
  );
}

export default App;
