import React,{useState,useEffect} from "react";
import './App.css';
import ExpenceList from "./Components/ExpenceList";
import ExpenceForm from "./Components/ExpenceForm";
import Alert from "./Components/Alert";
import { v4 as uuidv4 } from 'uuid';


// const initialExpences=[
//   {Id:uuidv4(), charge:"rent", amount:1600},
//   {Id:uuidv4(), charge:"car payment", amount:400},
//   {Id:uuidv4(), charge:"credit card bill", amount:1200}
// ];
const initialExpences = localStorage.getItem('expeances') ?
JSON.parse(localStorage.getItem("expeances")) : []

function App() {
  const [expeances,setExpences] = useState(initialExpences);
const [charge,setCharge] = useState('');
const [amount,setAmount] = useState('');
const [alert,setAlert] = useState({show:false});
const [edit,setEdit] = useState(false);
const [Id,setId] = useState(0)

useEffect(() =>{
  localStorage.setItem('expeances',JSON.stringify(expeances));

},[expeances]);


const handleCharge = e =>{
  setCharge(e.target.value);

}
const handleAmount = e =>{
  setAmount(e.target.value)

}
 const handleAlert = ({type,text}) =>{
   setAlert({show:true, type,text});
   setTimeout(()=>{
    setAlert({show:false}) 
   },6000)

 }

const handleSubmit = e => {
  e.preventDefault();
  if(charge !== '' && amount > 0){
    if(edit){
      let tempExpenses = expeances.map(item => {
        return item.Id === Id ? {...item,charge,amount} : item;
      });
      setExpences(tempExpenses);
      setEdit(false)
      handleAlert({type:'success',text: 'item Edited'});
    }
    else{
      const singleExpense = {Id:uuidv4(), charge, amount };
      setExpences([...expeances,singleExpense]);
      handleAlert({type:'success',text: 'item added'});

    }
    setCharge('');
    setAmount('');
  }else{

handleAlert({type:'danger', text:`change can't be empty ,
 value and amount value has to be bigger then zero`})
  }
};

const clearItems = () =>{
  setExpences([]);
  handleAlert({type: "danger", text: " all items deleted"});
 
}
const handleDelete = (Id) => {
  let tempExpenses = expeances.filter(item => item.Id !==Id);
  setExpences(tempExpenses);
  handleAlert({type: "danger", text: "item deleted"});
  
}

const handleEdit = (Id) => {
  let expense = expeances.find(item => item.Id===Id);
 let {charge,amount} = expense;
 setCharge(charge);
 setAmount(amount);
 setEdit(true);
 setId(Id);

}

  return (
    < >
    {alert.show && <Alert type ={alert.type} text={alert.text} />}
     
      <h1> Expance Calculator</h1>
      <main className="App">

      <ExpenceForm 
      charge={charge} 
      amount={amount}
      handleAmount={handleAmount}
      handleCharge={handleCharge}
      handleSubmit={handleSubmit}
      edit= {edit}
      />
      <ExpenceList expeances={expeances} 
      handleDelete={handleDelete} 
      handleEdit= {handleEdit}
      clearItems ={clearItems}
      />
      </main>
      <h1>
        total spending:<span className="total">
          ${expeances.reduce((acc,curr) => {
            return acc += parseInt(curr.amount);
          },0)}
        </span>
      </h1>
    
     
    </>
  );
}



export default App;
