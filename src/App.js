import React,{memo,useState,useEffect} from 'react'
import './App.css';
import axios from 'axios'
import {PlanWrapper,MoneyTotal} from './style/index'
import {Form,Row,Col,Input,Select,Button} from 'antd'
const { Option } = Select;

const Compelet=memo(({done,index,cancleCompleteTodo})=>{
  const handleChange =()=>{
    cancleCompleteTodo(index)
  }
  return <div className="done-item">
        <input type="checkbox" id={index} checked onChange={handleChange}/>
        <div style={{textDecoration:'line-through'}}> {done.plan}</div>
        <div>₽{done.lubu?done.lubu.toFixed(5):0}</div>
        <div>￥{done.rmb?done.rmb.toFixed(5):0}</div>
        <div>${done.dollar?done.dollar.toFixed(5):0}</div>
  </div>
})
const Todo=memo(({todo,index,completeTodo})=>{
  const handleClick =()=>{
    completeTodo(index)
  }
  return <div className="todo-item">
          <input type="checkbox"  onClick={handleClick}/>
          <div> {todo.plan}</div>
          <div>₽{todo.lubu?todo.lubu.toFixed(5):0}</div>
          <div>￥{todo.rmb?todo.rmb.toFixed(5):0}</div>
          <div>${todo.dollar?todo.dollar.toFixed(5):0}</div>
        </div> 
                  
})
const TodoForm=memo(({addTodo})=>{
  // 人民币转美元
  const [usdValue,setUsdValue]=useState(0)
  // 人民币转卢布
  const [rubValue,setRubValue]=useState(0)

  useEffect(async()=>{
      const result=await axios(`https://api.globus.furniture/forex`)
      console.log(result) 
      setUsdValue(result.data.USD.value)
      setRubValue(result.data.RUB.value)
    },[])

  const OnFinish=(values)=>{
    if (values.tprice==='lubu') {
      addTodo({
        plan:values.plan,
        lubu:values.price/1,
        rmb:values.price/rubValue,
        dollar:values.price/rubValue*usdValue
      })
    }else if(values.tprice==='rmb'){
      addTodo({
        plan:values.plan,
        lubu:values.price*rubValue,
        rmb:values.price/1,
        dollar:values.price*usdValue
      })
    }else{
      addTodo({
        plan:values.plan,
        lubu:values.price/usdValue*rubValue,
        rmb:values.price/usdValue,
        dollar:values.price/1
      })
    }
  }
  return <Form onFinish={OnFinish}>
            <Row gutter={12}>
              <Col span={8}><Form.Item name="plan"><Input type="text" placeholder="任务"/></Form.Item></Col>
              <Col span={6}><Form.Item name="price"><Input type="text" placeholder="价格" /></Form.Item></Col>
              <Col span={6}><Form.Item name="tprice">
                <Select placeholder="货币类型">
                        <Option value="lubu">卢比</Option>
                        <Option value="rmb">人民币</Option>
                        <Option value="dollar">美元</Option>
                </Select>
              </Form.Item>
              </Col>
              <Form.Item>
                  <Button type="primary" htmlType="submit">
                    添加
                  </Button>
              </Form.Item>
              </Row>
          </Form>  
        
})
const App=()=>{
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
    console.log(newDone[index]);
    addTodo(newDone[index])
    newDone.splice(index,1)
    setDone(newDone)
  }

  // 消费金额
  const [rubTotal,setRubTotal]=useState(0)
  const [rmbTotal,setRmbTotal]=useState(0)
  const [usdTotal,setUsdTotal]=useState(0)
  useEffect(()=>{
    let money  =todos.reduce((p,c) => {
      Object.keys(p).forEach(k=>p[k]+=parseFloat(c[k]))
        return p
    }, {lubu: 0, rmb: 0, dollar:0})
    setRubTotal(money.lubu)
    setRmbTotal(money.rmb)
    setUsdTotal(money.dollar)
  },[todos])

  // 已消费金额
  const [rubTotal2,setRubTotal2]=useState(0)
  const [rmbTotal2,setRmbTotal2]=useState(0)
  const [usdTotal2,setUsdTotal2]=useState(0)
  useEffect(()=>{
    let money  =done.reduce((p,c) => {
      Object.keys(p).forEach(k=>p[k]+=parseFloat(c[k]))
        return p
    }, {lubu: 0, rmb: 0, dollar:0})
    setRubTotal2(money.lubu)
    setRmbTotal2(money.rmb)
    setUsdTotal2(money.dollar)
  },[done])

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
      <MoneyTotal><span>将要花费: </span><span>₽{rubTotal.toFixed(5)}</span> <span>￥{rmbTotal.toFixed(5)}</span> <span>${usdTotal.toFixed(5)}</span></MoneyTotal>
      <div className="form-title compelet">
        已完成
      </div>
      {/* <Complete cancleCompleteTodo={cancleCompleteTodo}></Complete> */}
      <div className="done-list">
        {
          
          done?done.map((done,index)=>{
            return <Compelet key={index} done={done} index={index} cancleCompleteTodo={cancleCompleteTodo}></Compelet>
          }):null
        }
      </div>
      <MoneyTotal><span>已经花费: </span><span>₽{rubTotal2.toFixed(5)}</span> <span>￥{rmbTotal2.toFixed(5)}</span> <span>${usdTotal2.toFixed(5)}</span></MoneyTotal>
      </PlanWrapper>
     
      {/* <Add />
      <TodoPlan /> */}
    </div>
  );
}

export default App;
