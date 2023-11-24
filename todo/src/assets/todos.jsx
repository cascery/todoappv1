/* eslint-disable no-unused-vars */

import { useState,useEffect  } from 'react';
import { Showcaselist } from './task';
import { v4 as uuidv4 } from "uuid";

import { useNavigate } from 'react-router-dom';



export const Todos =()=>{


    const [motherlist,setmotherlist]=useState([]);
    const [newtitle,addnewtitle]=useState("");
   // eslint-disable-next-line no-unused-vars
   const [todolist,settodolist]=useState([]);
  
     const [avtask,setavtask]=useState(true);
    const [inputValue, setInputValue] = useState('');
    const [isListVisible, setListVisible] = useState(false);





    const addNewTaskToMotherList = (id, newTask) => {
      if (newTask !== '') {
        const updatedMotherList = motherlist.map((list) => {
          if (list.id === id) {
            const newTaskObj = {
              completed: false,
              id: uuidv4(),
              task: newTask,
            };
    
            list.tab = [...list.tab, newTaskObj];
            setmotherlist([...motherlist]); // Update UI with the new task locally
    
            // Add the new task to the database
            addNewTaskToDatabase(id, newTask);
          }
          return list;
        });
        setmotherlist(updatedMotherList);
      }
    };
    
    const addNewTaskToDatabase = async (listId, task) => {
      try {
        const formData = new FormData();
        formData.append('list_id', listId); // Assuming you have a list ID
        formData.append('task', task); // New task content
    
        const response = await fetch('http://localhost/todoapp/todo/src/assets/settodos.php', {
          method: 'POST',
          body: formData,
        });
    
        if (!response.ok) {
          throw new Error('Failed to add new task');
        }
    
        // If successful, update the frontend UI or refresh data from the server
        // You might want to call fetchTodos(listId) again here to update the tasks
      } catch (error) {
        console.error('Error adding new task:', error);
      }
    };




    

 const addNewTaskToMotherList2 = (id, newTask) => {
  if (newTask !== '') {
    // Check if the task already exists in the list
    const isTaskExists = motherlist.some((list) => list.id === id && list.tab.some((task) => task.task === newTask));

    if (!isTaskExists) {
      const updatedMotherList = motherlist.map((list) => {
        if (list.id === id) {
          const newTaskObj = {
            completed: false,
            id: uuidv4(),
            task: newTask,
          };

          list.tab = [...list.tab, newTaskObj];
        }
        return list;
      });
      setmotherlist(updatedMotherList);
      
      addNewTaskToDatabase(id, newTask);
    }
  }
};


    const toggleListVisibility = () => {
      setListVisible(!isListVisible);
    };
    const [listIds, setListIds] = useState([]);
    
     const userId = '8';
    // For getlists.php
    const fetchLists = async (userId) => {
      const formData = new FormData();
      formData.append('user_id', userId);
    
      try {
        const response = await fetch('http://localhost/todoapp/todo/src/assets/getlists.php', {
          method: 'POST',
          body: formData,
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch lists');
        }
    
        const responseData = await response.json();
    console.log(responseData.lists);
        if (responseData.error) {
          throw new Error(responseData.error);
        }
    
        const listIds = responseData.map((list) => list.id); // Extracting IDs from the fetched lists

        setListIds(listIds);
          const newListsFromDB = responseData.map((list) => ({
            title: list.title,
            id: list.id,
            tab: [], // Assuming an empty tab for the fetched titles
          }));
    
          setmotherlist((prevMotherlist) => {
            const updatedList = newListsFromDB.filter((newList) => !prevMotherlist.some((list) => list.id === newList.id));
            return [...prevMotherlist, ...updatedList];
          });    
          console.log('Lists Data:', responseData.lists);
      
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    };

// For gettodos.php


    useEffect(() => {
      fetchLists(userId);
     
     
    }, [userId]);
  

    useEffect(() => {



      const fetchTodos = async (listId) => {
        const todosFormData = new FormData();
        todosFormData.append('list_id', listId);
        console.log(todosFormData);
        console.log('hello');
      
        try {
          const response = await fetch('http://localhost/todoapp/todo/src/assets/gettodos.php', {
            method: 'POST', // Change this to 'POST' if your backend expects POST requests
            body: todosFormData,
          });
      
          if (!response.ok) {
            throw new Error('Failed to fetch todos');
          }
      
          const todosData = await response.json();
          console.log(`inside the  fetch todos:`,listId);
      
          todosData.forEach(element => {
      
            addNewTaskToMotherList2 (listId,element.context);
            
          
          });
      
          console.log(`Todos Data for listId ${listId}:`, todosData);
        } catch (error) {
          console.error(`Error fetching todos for listId ${listId}:`, error);
        }
      };  
      listIds.forEach((id) => {
        fetchTodos(id);
      });
    }, [ listIds]);





    





    const deleteElementFromAlist = async (listId, elementId) => {
      try {
          const formData = new FormData();
          formData.append('list_id', listId);
          formData.append('element_id', elementId);
  
          const response = await fetch('http://localhost/todoapp/todo/src/assets/deletetodo.php', {
              method: 'POST',
              body: formData,
          });
  
          if (!response.ok) {
              throw new Error('Failed to delete todo');
          }
  
       
      
      } catch (error) {
          console.error('Error deleting todo:', error);
      }
  };
    

const completetask =(listId,elementId)=>{

  const updatedMotherList = motherlist.map((list) => {
    if (list.id === listId) {

      list.tab = list.tab.map((element) =>{ if (element.id == elementId) element.completed=!element.completed;

        return element;
      
    });
    }
    return list;
  });
  setmotherlist(updatedMotherList);


}


    const handleButtonClick = () => {
        setInputValue('');
        addnewtitle("") ;// Set the input value to an empty string
      };










      const addingnewlist = async () => {
        if (newtitle !== '') {
          const addNewListToDatabase = async (title) => {
            try {
              const formData = new FormData();
              formData.append('user_id', userId); // Assuming you have a user ID
              formData.append('title', title); // New list title
            
              const response = await fetch('http://localhost/todoapp/todo/src/assets/addlist.php', {
                method: 'POST',
                body: formData,
              });
            
              if (!response.ok) {
                throw new Error('Failed to add new list');
              }
            
              // If successful, update the frontend UI or refresh data from the server
              // You might want to call fetchLists(userId) again here to update the lists
            } catch (error) {
              console.error('Error adding new list:', error);
            }
          };
    
          const elemento = {
            title: newtitle,
            id: uuidv4(),
            tab: todolist
          };
          const newarrayo = [...motherlist, elemento];
          setmotherlist(newarrayo);
          await addNewListToDatabase(newtitle);
        }
      };



      const deletelist = async (id) => {
        const updatedList = motherlist.filter((thing) => thing.id !== id);
        setmotherlist(updatedList);
      
        try {
          const formData = new FormData();
          formData.append('list_id', id);
      
          const response = await fetch('http://localhost/todoapp/todo/src/assets/deletelist.php', {
            method: 'POST',
            body: formData,
          });
      
          if (!response.ok) {
            throw new Error('Failed to delete list');
          }
        } catch (error) {
          console.error('Error deleting list:', error);
        }
      };
    


    
    const handling=(event)=>{
        addnewtitle(event.target.value);
       
    };
    
    const combinedFunction = () => {
        addingnewlist();
        handleButtonClick();
      };








return (


    

    <div className='TodoWrapper'>
   
<div className='inputing'>



    <input className='todo-input'  value={inputValue} onChange={(e) => {
    setInputValue(e.target.value);
    handling(e); 
  }}  placeholder='add a list?'/>



    <button className='todo-btn' onClick={combinedFunction} onKeyPress={combinedFunction}> Add</button>
</div>
<div>

    {
    
    
    motherlist.map((newtask)=>{
      
        
        return( 
         
        
        <div    key={newtask.id}>
        
        < Showcaselist
         title={newtask.title} 
         todolist={newtask.tab} 
         id={newtask.id}
         deletelist={deletelist}
         addNewTaskToMotherList={addNewTaskToMotherList}
         deleteElementFromAlist ={deleteElementFromAlist }
         completetask={completetask}
        />

  
        
        </div>)
}    )

}


</div>


<div className='error'     


style={{display:avtask?" none":"block"}}> write something!! </div>

 </div> 
 
 
 
 
 


); }

    

    