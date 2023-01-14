import axios from 'axios';
import React, {useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import { MdOutlineDeleteForever } from "react-icons/md";
import { BsFillPenFill } from "react-icons/bs";
import { ExpensesliceAction } from '../Store/Expenseslice';
import Navbars from './Navbars'
import { CSVLink } from 'react-csv';

const Expense = () => {

  const dispatch = useDispatch(state => state.Expense)

  const [money, setMoney] = useState('')
  const [edit, setEdit] = useState(false)
  const [desc, setDesc] = useState('')
  const [totalAmt, setTotalAmt] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')
  const [id, setId] = useState(null)
  const { expensearr } = useSelector(state => state.Expense)

  let primeUser;
  if(totalAmt > 10000){
    primeUser = true;
  }
  else{
    primeUser = false;
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    let enteredCategory;

    if (category !== 'Select :') {
      enteredCategory = category;
    } else {
      alert("Please Select a valid category")
      return
    }

    const x = {
      desc: desc,
      category: enteredCategory,
      date: date,
      money: money
    }
    console.log(x)
    const response = await axios.post('https://expensetracker-ab566-default-rtdb.firebaseio.com/expense.json', x)

    if (response.status === 200) {
      console.log('data stored successfully', response)
      dispatch(ExpensesliceAction.addExpense(x));
    }
    else {
      alert(response.data);
    }

    setDesc('');
    setDate('');
    setMoney('');
  }

  const getExpenseData = async (e) => {
    console.log('getexpensedata ....')
    const response = await axios.get('https://expensetracker-ab566-default-rtdb.firebaseio.com/expense.json')

    if (response.status === 200) {
      let arr = [];
      setEdit(false);
      for (let key in response.data) {
        arr.push({
          id: key,
          desc: response.data[key].desc,
          category: response.data[key].category,
          date: response.data[key].date,
          money: response.data[key].money
        })
      }
      dispatch(ExpensesliceAction.getExpense(arr));
      console.log(arr)
    }
    else {
      alert(response.data);
    }
  }

  const deleteExpense = async (id) => {
    let delete_id = id;

    const res = await axios.delete(`https://expensetracker-ab566-default-rtdb.firebaseio.com/expense/${delete_id}.json`)

    if (res.status === 200) {
      getExpenseData();
      console.log("expense deleted");
    }
    else {
      alert(res.status);
    }
  }

  const editExpense = async (e) => {
    e.preventDefault();
    const x = {
      id,
      desc,
      category,
      date,
      money
    }
    console.log(x)
    const res = await axios.put(`https://expensetracker-ab566-default-rtdb.firebaseio.com/expense/${id}.json`, x)

    if (res.status === 200) {
      console.log('expense edited')
      getExpenseData();
      setDesc('');
      setCategory('')
      setDate('');
      setMoney('');
    }
  }

  const getTotalAmt = () => {
    let totalAmt = 0
    expensearr.forEach(element => {
      totalAmt += Number(element.money);
    });
    setTotalAmt(totalAmt);
    return totalAmt;
  }

  const headers = [
    { label: "Money", key: "Money" },
    { label: "Description", key: "Desc" },
    { label: "Category", key: "Cate" },
    { label: "date", key: "date" },
  ];

  var data=[];
  expensearr.forEach((ele)=>{     
      var Desc=(ele.desc);
      var Cate=(ele.category);
      var date= (ele.date);
      var Money = (ele.money);


      const x={
        Money,
        Desc,
        Cate,
        date
      }
      data.push(x)
    
  })

  return (
    <>
      <Navbars />
      <div style={{ backgroundColor: "lightgray", position: "fixed", height: "100%", width: "100%" }}>
        <form onSubmit={edit === true ? editExpense : submitHandler}>
          <div style={{ margin: "2%", display: "inherit", textAlign: "left", marginTop: "-2%" }}>
            <label style={{ padding: 5 }}>Money: </label>
            <input type='number' style={{ borderRadius: "0.3rem" }} value={money} onChange={(e)=>setMoney(e.target.value)}></input>

            <label style={{ padding: 5 }}>Description : </label>
            <input type='text' style={{ borderRadius: "0.3rem", width: "15%" }} value={desc} onChange={(e)=>setDesc(e.target.value)}></input>

            <label style={{ padding: 5 }}>Date </label>
            <input type='date' style={{ borderRadius: "0.3rem", width: "15%" }} value={date} onChange={(e)=>setDate(e.target.value)}></input>

            <label style={{ padding: 10 }}>Category: </label>
            <select style={{ borderRadius: "0.3rem" }} value={category} onChange={(e)=>setCategory(e.target.value)}>
              <option >Select :</option>
              <option >Food</option>
              <option >Petrol</option>
              <option >Salary</option>
              <option >Shopping</option>
            </select>

            <Button variant='outline-success' type='submit' style={{ margin: "5%" }}>{edit === true ? 'update expense':'Add Expense'}</Button>
          </div>
        </form>
        <div style={{ marginTop: "-5%", height: 1, position: "absolute", width: "100%", backgroundColor: "black" }} />
        <div>
          <div className="container text-start ps-0 my-3 fs-4 fw-bold">
            <span className="text-success">
              Total expenses
            </span>
            <span className="text-success ms-3">
              <i className="bi bi-currency-dollar"></i>
              <span> {getTotalAmt}</span>
            </span>
            <button onClick={getExpenseData}>
              Refresh
            </button>
            <CSVLink data={data} headers={headers} style={{color:"yellow"}}> Click here for Download Expenses</CSVLink>
          </div>
          <div
            className="p-1 d-sm-block mx-auto"
            style={{ width: "95%" }}
            >
            <div className="row justfy-content-center align-items-center"
              style={{ color: "white", backgroundColor: "black" }} >
              <div className="col-3 fs-6  text-wrap text-center p-2">Title</div>
              <div className="col-3 fs-6 fs-md-1 text-wrap text-center p-2">
                Category
              </div>
              <div className="col-3 fs-6 fs-md-1 text-wrap text-center p-2">
                Date
              </div>
              <div className="col-3 fs-6 fs-md-1 text-wrap text-center p-2">
                Amount
              </div>
            </div>
            {expensearr.map((ele, index) => {
              return (
                <div key={index} className="row position-relative justfy-content-center align-items-center expenseData">
                  <div className="col-sm-3 col-3  text-wrap text-center p-2 text-truncate">
                    {ele.desc}
                  </div>
                  <div className="col-sm-3 col-3  text-wrap text-center p-2">
                    {ele.category}
                  </div>
                  <div className="col-sm-3 col-3   text-wrap text-center p-2">
                    {ele.date}
                  </div>
                  <div className="col-sm-3 col-3  fs-5 text-success fw-bold text-wrap text-center p-2">
                    <i className="bi bi-currency-dollar"></i> {ele.money}
                  </div>
                  <div className='position-absolute d-flex justfy-content-center align-items-center top-0 start-0 '>
                    <button className='text-danger' onClick={() => {
                      deleteExpense(ele.id);
                    }}>
                      <MdOutlineDeleteForever />
                    </button>
                    <button className='ms-2 text-dark' onClick={() => {
                      setDesc(ele.desc);
                      setCategory(ele.category);
                      setDate(ele.date);
                      setMoney(ele.money);
                      setId(ele.id);
                      setEdit(true);
                    }} >
                      <BsFillPenFill />
                    </button>
                  </div>
                </div>
              )
            })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Expense