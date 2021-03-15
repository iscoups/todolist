import React,{memo,useState,useEffect} from 'react'
import axios from 'axios'
import {Form,Row,Col,Input,Select,Button} from 'antd'
const { Option } = Select;

const TodoForm=memo(({addTodo})=>{
    // 人民币转美元
    const [usdValue,setUsdValue]=useState(0)
    // 人民币转卢布
    const [rubValue,setRubValue]=useState(0)
  
    useEffect(()=>{
        (async()=>{
            const result=await axios(`https://api.globus.furniture/forex`)
            console.log(result) 
            setUsdValue(result.data.USD.value)
            setRubValue(result.data.RUB.value)
          })()
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
  export default TodoForm