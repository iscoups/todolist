import React,{memo} from 'react'
const Todo=memo(({todo,index,completeTodo})=>{
    const handleChange =()=>{
      completeTodo(index)
    }
    return <div className="todo-item">
            <input type="checkbox" checked={false}  onChange={handleChange}/>
            <div> {todo.plan}</div>
            <div>₽{todo.lubu?todo.lubu.toFixed(5):0}</div>
            <div>￥{todo.rmb?todo.rmb.toFixed(5):0}</div>
            <div>${todo.dollar?todo.dollar.toFixed(5):0}</div>
          </div> 
                    
  })

export default Todo
