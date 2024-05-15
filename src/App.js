import './App.css';
import { TodoProvider } from './context/TodoContext';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { useState } from 'react';

function App() {
    const [toastMessage, setToastMessage] = useState(''); 
    const [showToast, setShowToast] = useState(false); 

    const showToastMessage = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000); // Hiển thị thông báo trong 3 giây
    };

    return (
        <TodoProvider>
            <div className="todoapp">
                <h1 className="todoapp_text">Todo Application</h1>
                <AddTodo showToastMessage={showToastMessage} />
                <TodoList showToastMessage={showToastMessage} />
            </div>
        </TodoProvider>
    );
}

export default App;
