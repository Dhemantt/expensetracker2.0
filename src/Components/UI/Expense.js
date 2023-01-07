import React, { useRef } from 'react'
import { Button } from 'react-bootstrap';
import Navbars from './Navbars'

const Expense = () => {

  const moneyInputref = useRef();
  const descInputref = useRef();
  const categoryInputref = useRef();

  const submitHandler=(e)=>{
    e.preventDefault();
    
    const enteredMoney = moneyInputref.current.value;
    const enteredDesc = descInputref.current.value;
   let enteredCategory;

    if (categoryInputref.current.value !== 'Select :') {
      enteredCategory = categoryInputref.current.value;
    }else{
      alert("Please Select a valid category")
      return
    }

    console.log(enteredCategory,enteredDesc,enteredMoney)

    var arr=[]
    const x={
      money:enteredMoney,
      desc:enteredDesc,
      cate:enteredCategory
    }
    arr.push(x)


    moneyInputref.current.value='';
    descInputref.current.value='';
    categoryInputref.current.value='Select :';
  }

  return (
    <>
      <Navbars />
      <div style={{ backgroundColor: "lightgray",position:"fixed", height: "100%", width: "100%" }}>
        <form onSubmit={submitHandler}>
          <div style={{ margin: "2%", display: "inherit", textAlign: "left" ,marginTop:"-2%"}}>
            <label style={{ padding: 5 }}>Money: </label>
            <input type='number' style={{ borderRadius: "0.3rem" }} ref={moneyInputref}></input>

            <label style={{ padding: 5 }}>Description : </label>
            <input type='text' style={{ borderRadius: "0.3rem",width:"15%" }} ref={descInputref} ></input>

            <label style={{ padding: 10 }}>Category: </label>
            <select style={{ borderRadius: "0.3rem" }} ref={categoryInputref}>
              <option >Select :</option>
              <option >Food</option>
              <option >Petrol</option>
              <option >Salary</option>
              <option >Shopping</option>
            </select>

            <Button variant='outline-success' type='submit' style={{margin:"5%"}}>Add</Button>
          </div>

        </form>
        <div style={{ marginTop:"-5%", height: 1, position: "absolute", width: "100%", backgroundColor: "black" }} />
        <div>
            <ul>

            </ul>
        </div>
      </div>
    </>
  )
}

export default Expense