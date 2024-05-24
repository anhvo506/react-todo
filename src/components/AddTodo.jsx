import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { TodoContext } from "../context/TodoContext";

const AddTodo = ({ showToastMessage }) => {
    const [title, setTitle] = useState('');
    const [todos, setTodos] = useContext(TodoContext);
    const [showToast, setShowToast] = useState(false); 

    const addTodo = (e) => {
        e.preventDefault();
        if (title.trim() === '') {
            alert('Field cannot be blank');
            return;
        }
        const newTodos = [...todos, { id: uuidv4(), title: title, completed: false }];
        setTodos(newTodos);
        setTitle('');
        setShowToast(true); 
        setTimeout(() => {
            setShowToast(false); 
        }, 3000);
    }

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <div className="todoapp_input">
            <div className="todoapp_input_text">
                <input value={title} className="form-input" onChange={e => setTitle(e.target.value)} placeholder="Add todo.." />
            </div>
            <button className="todoapp_input_btn button_add" onClick={addTodo}>+</button>
            <button className="todoapp_input_btn button_edit">Edit</button>
            {showToast && ( 
                <div className="container">
                    <div className="message">
                        <i className="fas fa-check-circle message_icon"></i>
                        <div className="message_text">Added successfully!</div>
                    </div>
                    <div className="coutdown"></div>
                </div>
            )}
        </div>
    );
}

export default AddTodo;
