import './TodoItem.css'

function TodoItem({ item, delItem, toggle }) {
    return (
        <div className="todoCard">
            <li>
                <input 
                    type="checkbox" 
                    checked={item.complete}
                    onChange={() => toggle(item.id)}
                    aria-label={`Mark ${item.name} as ${item.complete ? 'incomplete' : 'complete'}`}
                />
                <span 
                    className={`todo-text ${item.complete ? 'completed' : ''}`}
                >
                    {item.name}
                </span>
                <button 
                    onClick={() => delItem(item.id)}
                    aria-label={`Delete ${item.name}`}
                    className="delete-button"
                >
                    🗑️
                </button>
            </li>
        </div>
    )
}

export default TodoItem