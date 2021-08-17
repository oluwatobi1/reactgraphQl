import React from 'react'

export default function Todo({todo}) {
    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.checked}/>
            </label>
            {todo.name}
        </div>
    )
}
