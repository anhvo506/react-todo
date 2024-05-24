import './App.css';
import { TodoProvider } from './context/TodoContext';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {
    const showToastMessage = (message) => {
        setTimeout(() => {
        }, 3000); 
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
