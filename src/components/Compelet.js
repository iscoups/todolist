import React,{memo} from 'react'
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

export default Compelet