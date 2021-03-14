import styled from "styled-components";

export const PlanWrapper=styled.div`
  .todo-item,.done-item{
    border-top:1px solid #ccc;
    height:50px;
    padding:15px 0px;
  }
  .todo-item::after{
    content:''; 
    display:table;
    clear:both;
  }
  .todo-item:last-child{
    border-bottom:1px solid #ccc;
  }
  .todo-item input{
    float:left;
    padding:10px 0px;
    margin-right:10px;
  }
  .todo-item div{
    float:left;
    margin-right:50px;
  }
  
  .done-item::after{
    content:''; 
    display:table;
    clear:both;
  }
  
  .done-item:last-child{
    border-bottom:1px solid #ccc;
  }
  
  .done-item input{
    float:left;
    padding:10px 0px;
    margin-right:10px;
  }
  .done-item div{
    float:left;
    margin-right:50px;
  }
  .form-title{
    height:50px;
    line-height:50px;
    font-size:18px;
    font-weight:7px;
  }
  .compelet{
    margin-top:20px;
  }`

export const MoneyTotal=styled.div`
overflow:hidden;
border-bottom:1px soild #ccc;
  span{
    display:block;
    float:left;
    margin-right:50px
  }
  span::after{
    content:'';
    display:table;
    clear:both;
  }`