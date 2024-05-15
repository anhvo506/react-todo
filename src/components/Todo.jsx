import React, { useContext, useState, useEffect, useRef } from 'react';
import { TodoContext } from '../context/TodoContext';
import Toast from './Toast'; 

const Todo = ({ id, title, completed, showToastMessage }) => {
    const [todos, setTodos] = useContext(TodoContext);
    const [editing, setEditing] = useState(false); // Define editing state
    const [editTitle, setEditTitle] = useState(title); // Define editTitle state
    const [showEditToast, setShowEditToast] = useState(false); // State for edit toast
    const [showDeleteToast, setShowDeleteToast] = useState(false); // State for delete toast
    const [toastMessage, setToastMessage] = useState(''); // Message for toast
    const toastContainerRef = useRef(null); // Ref for toast container

    useEffect(() => {
        // Add event listener to document for mousedown
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Clean up event listener when component unmounts
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        // Hide toast after a certain amount of time (3000 milliseconds)
        const timer = setTimeout(() => {
            setShowEditToast(false);
            setShowDeleteToast(false);
        }, 3000);
        
        // Clean up timer when component unmounts or when toast is hidden
        return () => clearTimeout(timer);
    }, [showEditToast, showDeleteToast]);

    // Handle click outside function
    const handleClickOutside = (e) => {
        if (toastContainerRef.current && !toastContainerRef.current.contains(e.target)) {
            // Click outside the toast container
            setShowEditToast(false);
            setShowDeleteToast(false);
        }
    };

    const completeTodo = (e) => {
        const updatedTodos = todos.map((item) => {
            if (item.id === id) {
                item.completed = e.target.checked;
            }
            return item;
        });
        setTodos(updatedTodos);
    };

    // const deleteTodo = (e) => {
    //     e.preventDefault();
       
    //     const updatedTodos = todos.filter((item) => item.id !== id);
    //     setTodos(updatedTodos);
    //     setToastMessage('Deleted successfully!'); // Set toast message
    //     setShowDeleteToast(true); // Show delete toast
    // };

    const deleteTodo = (e) => {
        e.preventDefault();
        setToastMessage('Deleted successfully!'); // Set toast message
        setShowDeleteToast(true); // Show delete toast
    
        // Use a setTimeout to delay the state update of todos
        setTimeout(() => {
            const updatedTodos = todos.filter((item) => item.id !== id);
            setTodos(updatedTodos);
        }, 3000);
    };
    
    
    
    

    const handleEdit = () => {
        setEditing(true); // Set editing state to true when edit icon is clicked
    };

    const handleEditChange = (e) => {
        setEditTitle(e.target.value);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedTodos = todos.map((item) => {
            if (item.id === id) {
                item.title = editTitle;
            }
            return item;
        });
        setTodos(updatedTodos);
        setEditing(false); // Set editing state to false after editing is submitted
        setToastMessage('Edited successfully!'); // Set toast message
        setShowEditToast(true); // Show edit toast
    };

    const editTodo = (e) => {
        e.preventDefault();
        handleEdit(); // Start editing mode
        setToastMessage('Editing mode activated!'); // Set toast message
        setShowEditToast(true); // Show edit toast
    };

    return (
        <li>
            <div className="todoapp_todo">
                <div className="todoapp_todos_left">
                    <input
                        type="checkbox"
                        id={id}
                        className="todoapp_todos_left-checkbox"
                        checked={completed}
                        onChange={completeTodo}
                    />
                    {editing ? (
                        <input
                            type="text"
                            value={editTitle}
                            onChange={handleEditChange}
                            onBlur={handleEditSubmit}
                        />
                    ) : (
                        <div className="todoapp_todos_left-text">{title}</div>
                    )}
                </div>
                <div className="todoapp_todos_right">
                    <i className="fas fa-edit todoapp_todos_right-iconedit" onClick={editTodo}></i>
                    <i className="fas fa-times todoapp_todos_right-icondelete" onClick={deleteTodo}></i>
                </div>
            </div>
            {/* Toast */}
            {(showEditToast || showDeleteToast) && (
                <div className="container" ref={toastContainerRef}>
                    <div className="message">
                        <i className="fas fa-check-circle message_icon"></i>
                        <div className="message_text">{toastMessage}</div>
                    </div>
                    <div className="coutdown"></div>
                </div>
            )}
        </li>
    );
};

export default Todo;


