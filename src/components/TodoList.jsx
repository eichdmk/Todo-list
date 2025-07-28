import { useEffect, useState } from "react"
import TodoItem from "./TodoItem"
import './TodoList.css'

function TodoList(){
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || [])
    const [value, setValue] = useState('')
    const [theme, setTheme] = useState(localStorage.getItem('theme'))

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    useEffect(()=>{
        localStorage.setItem('theme', theme)
    }, [theme])

    function addTodo(){
        if(!value.trim()) return

        const obj = {
            id: Date.now(),
            name: value,
            complete: false
        }

        setTodos(prevTodos => [...prevTodos, obj])
        setValue('')
    }

    function delTodo(id){
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
    }

    function toggleTodo(id) {
        setTodos(prevTodos => 
            prevTodos.map(todo => 
                todo.id === id ? {...todo, complete: !todo.complete} : todo
            )
        )
    }

    function allToggleTodo(){
        const allCompleted = todos.every(todo => todo.complete)
        
        setTodos(prevTodos => 
            prevTodos.map(todo => ({
                ...todo,
                complete: !allCompleted 
            }))
        )
    }

    function allDel(){
        setTodos(prevTodos => prevTodos.filter(todo => !todo.complete))
    }

    function handleKeyPress(e) {
        if(e.key === 'Enter') {
            addTodo()
        }
    }

    const getAllToggleText = () => {
        if (todos.length === 0) return ''
        const allCompleted = todos.every(todo => todo.complete)
        return allCompleted ? 'Убрать отметку всем' : 'Отметить все завершенными'
    }

    function toggleTheme () {
        theme === '' ? setTheme('dark') : setTheme('')

    }

    return(
        <div className={`todo-container ${theme} `}>
            <div className="todo-header">
                <button className="toggleThemeBtn" onClick={()=>toggleTheme()}>{theme === '' ? '🌞': '🌙'}</button>
                <h1>Мои задачи</h1>
                <div className="todo-stats">
                    <span className="total-count">Всего: {todos.length}</span>
                    <span className="completed-count">
                        Выполнено: {todos.filter(todo => todo.complete).length}
                    </span>
                </div>
            </div>

            <div className="input-section">
                <div className="input-wrapper">
                    <input 
                        type="text" 
                        placeholder="Введите новую задачу..."
                        onKeyDown={handleKeyPress} 
                        value={value} 
                        onChange={e => setValue(e.target.value)} 
                        className="todo-input"
                    />
                    <button onClick={addTodo} className="add-button">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="todo-list">
                {todos.length > 0 ? (
                    todos.map(item => (
                        <TodoItem 
                            key={item.id} 
                            item={item} 
                            delItem={() => delTodo(item.id)} 
                            toggle={() => toggleTodo(item.id)}
                        />
                    ))
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">📋</div>
                        <h3>Список задач пуст</h3>
                        <p>Добавьте свою первую задачу!</p>
                    </div>
                )}
            </div>
            
            <div className="buttons">
                {todos.some(todo => todo.complete) && (
                    <button className="allDeleteBtn" onClick={allDel}>
                        Удалить все завершенные
                    </button>
                )}

                {todos.length > 0 && (
                    <button className="allToggleBtn" onClick={allToggleTodo}>
                        {getAllToggleText()}
                    </button>
                )}
            </div>
        </div>
    )
}

export default TodoList