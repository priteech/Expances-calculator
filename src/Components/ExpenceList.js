import React from 'react';
import Item from"./ExpenceItem";
import {MdDelete} from 'react-icons/md'

export const ExpenceList = ({expeances,handleEdit,handleDelete,clearItems}) => {
    return (
        <>
           <ul className= "list">
               {
                   expeances.map((expense)=>{
                       return<Item key={expense.Id} expense={expense}
                       handleDelete={handleDelete}
                       handleEdit= {handleEdit}
                       />;
                   })
               }
               
               </ul> 
               {expeances.length>0 && (<button className="btn"  onClick={clearItems} >clear expenses
               <MdDelete className="btn-icon"/>
               </button>)}
      
        </>
    )
}
export default ExpenceList
