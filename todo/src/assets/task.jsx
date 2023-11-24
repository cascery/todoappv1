import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus,faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useState,useRef } from 'react';


import soundFile from './sound.mp3';

export const Showcaselist = (props) => {
  const { title, id, deletelist, addNewTaskToMotherList, todolist,completetask, deleteElementFromAlist } = props;
  const [newTask, setNewTask] = useState(''); // Define newTask state
  const [lol,setlol]=useState(true);
  const handleNewTaskClick = () => {
    addNewTaskToMotherList(id, newTask); // Call the function via props with the task
    setNewTask(''); // Reset the new task input
  };


  const [audio] = useState(new Audio(soundFile));
  const audioRef = useRef(null);


  const playSound = (task) => {
    if (task.completed)
   
    audio.play();
  };


 const  switching=()=>{

setlol(!lol);


 };




  const [isTodosVisible, setIsTodosVisible] = useState(true);

  const toggleTodosVisibility = () => {
    setIsTodosVisible(!isTodosVisible);
  };

  return (
   

    <div className="Todo"> 
    
    
<div className='title-delete'>

<span className='title'> {title}</span> 
<span className='items-count'> {todolist.length} items</span>


      <FontAwesomeIcon 
      
      className="delete" 
      
      icon={faTrash} 
      
      
      onClick={() => deletelist(id)} />
</div>

<div className='input-and-adding'  >
      <input
        type="text"
        placeholder="Add a task"
        value={newTask}
        className='todo-inputM'
        onChange={(e) => setNewTask(e.target.value)}
      />
      <FontAwesomeIcon
      
      className="adding"
      
      icon={faPlus} 
      
      onClick={handleNewTaskClick} />
      
      </div>
      <button className="toggle-todos-button" onClick={toggleTodosVisibility}>
        {isTodosVisible ? 'Hide Todos' : 'Show Todos'}
      </button>

      {isTodosVisible && (

      <div  className='todos'>


        {todolist.map((task) =>
        
        
        (
          <div  className={`completed ${task.completed ? 'incompleted' : 'completed'}`}
          
          
          
          
          key={task.id}>
            
            {task.task} 


            <div   className="action-buttons">  
          
          <FontAwesomeIcon 
          
          className="delete-icon" 
          
          icon={faTrash} 
          
          onClick={() =>
          
          
          deleteElementFromAlist(id, task.id)} />



<audio ref={audioRef} src={soundFile} />

<FontAwesomeIcon 
           
          className='complete-icon'
          icon={faCheckCircle} 
          
          onClick={() =>{
          
          
          completetask(id, task.id); switching(); playSound(task)} }/>
          
          </div> 
          
          </div> 

         ))}


      </div>)}


    </div>
  );
};







Showcaselist.propTypes = {
  deletelist: PropTypes.func.isRequired,
  title:PropTypes.func.isRequired, id:PropTypes.func.isRequired,
   addNewTaskToMotherList:PropTypes.func.isRequired,
   completetask:PropTypes.func.isRequired,
   todolist: PropTypes.array.isRequired,
   deleteElementFromAlist:PropTypes.func.isRequired,
};