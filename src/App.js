import React,{memo,useState} from 'react'
import './App.css'
import TodoForm from './components/TodoForm'
import Todo from './components/Todo'
import Compelet from './components/Compelet'
import {PlanWrapper,MoneyTotal} from './style/index'

const App=memo(()=>{
  const [todos,setTodo]=useState([
    { 
      plan:'去吃麻辣烫',
      lubu:1,
      rmb:0.08707,
      dollar:0.01323,
      done:false
    },
    {
      plan:'去吃海底捞',
      lubu:1,
      rmb:0.08707,
      dollar:0.01323,
      done:false
    }
  ])
  const [done,setDone]=useState([])

  const addTodo = (text)=>{
    const newTodos=[...todos,text]
    setTodo(newTodos)

  }
  const addDone = (text)=>{
    const newDone=[...done,text]
    setDone(newDone)
  }

  // 完成任务的方法
  const completeTodo = (index)=>{
    const newTodos=[...todos]
    addDone(newTodos[index])
    newTodos.splice(index,1)
    setTodo(newTodos)
  }

  // 取消已完成的任务
  const cancleCompleteTodo = (index)=>{
    const newDone=[...done]
    addTodo(newDone[index])
    newDone.splice(index,1)
    setDone(newDone)
  }

  // 消费金额
  const total  =todos.reduce((p,c) => {
    Object.keys(p).forEach(k=>p[k]+=parseFloat(c[k]))
      return p
  }, {lubu: 0, rmb: 0, dollar:0})

  // 已消费金额
  const total2  =done.reduce((p,c) => {
    Object.keys(p).forEach(k=>p[k]+=parseFloat(c[k]))
      return p
  }, {lubu: 0, rmb: 0, dollar:0})

  return (
    <div className="App">
      <TodoForm addTodo={addTodo}></TodoForm>
      <PlanWrapper>
      <div className="form-title">
        计划
      </div>
      <div className="todo-list">
        { 
          todos.map((todo,index)=>{
            return <Todo key={index} todo={todo} index={index} completeTodo={completeTodo}></Todo>    
          })
        }
      </div>
      <MoneyTotal><span>将要花费: </span><span>₽{total.lubu.toFixed(5)}</span> <span>￥{total.rmb.toFixed(5)}</span> <span>${total.dollar.toFixed(5)}</span></MoneyTotal>
      <div className="form-title compelet">
        已完成
      </div>
      <div className="done-list">
        {
          
          done?done.map((done,index)=>{
            return <Compelet key={index} done={done} index={index} cancleCompleteTodo={cancleCompleteTodo}></Compelet>
          }):null
        }
      </div>
      <MoneyTotal><span>已经花费: </span><span>₽{total2.lubu.toFixed(5)}</span> <span>￥{total.rmb.toFixed(5)}</span> <span>${total2.dollar.toFixed(5)}</span></MoneyTotal>
      </PlanWrapper>
     
      {/* <Add />
      <TodoPlan /> */}
    </div>
  );
})

export default App;
