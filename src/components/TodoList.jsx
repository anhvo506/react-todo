import { useContext } from 'react';
import Todo from './Todo';
import { TodoContext } from '../context/TodoContext';

const TodoList = ({ showToastMessage }) => {
    const [todos] = useContext(TodoContext);

    return (
        <div>
            {todos.length > 0 ? (
                <ul className="todoapp_todos">
                    {todos.map((item) => (
                        <Todo key={item.id} id={item.id} title={item.title} completed={item.completed} showToastMessage={showToastMessage} />
                    ))}
                </ul>
            ) : (
                <h4>No todo found. Please add some...</h4>
            )}
        </div>
    );
}

export default TodoList;
