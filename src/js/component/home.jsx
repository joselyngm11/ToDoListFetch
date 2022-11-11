import React, { useState , useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const URL_API = "https://assets.breatheco.de/apis/fake/todos/user"

const Home = ()  => {

	const [inputValue, setInputValue] = useState("")
	const [tasks, setTasks] = useState([])

	// useEffect(() => {
		const postToDo = async () =>{
			let response = await fetch(URL_API+"/joselyngm",{
				headers:{
					"Content-Type":"application/json"
				},
				method:"POST",
				body: JSON.stringify( []) 
			})
			let data = await response.json()
			console.log(data)
	}
	// postToDo()
		
	// }, [])

	useEffect(() => {
		getToDo()
	}, [])

	// useEffect(() => {
	// 	putToDo()
	// }, [tasks])

	const handleAdd = (e) => {
		let newArray = [...tasks]
		if (e.key === 'Enter'){
			// newArray.push(inputValue)
			newArray.push({label:inputValue, done: false})
			setTasks(newArray)
			putToDo(newArray)
			// setTasks(newArray)
			// console.log(newArray)
			setInputValue("")
		}
	}

	const handleDelete = (currentIndex) => {
		let newTasks = tasks.filter((task, index)=> index!=currentIndex)
		setTasks(newTasks)
		console.log(newTasks)
		if(newTasks.length == 0){
			deleteTask()
			postToDo()
		}else{
			putToDo(newTasks)
		}
		
		
	}

	const handleUpdate = (e,currentIndex)=>{
		let newTasks = tasks.map((task, index)=> {
			if(index == currentIndex) return {...task, status:e.target.value}
			else return task
		})
		setTasks(newTasks)
	}

	const deleteTask = async () =>{
		let response = await fetch(URL_API+"/joselyngm",{
			headers:{
				"Content-Type":"application/json"
			},
			method:"DELETE",
		})
		let data = await response.json()
		if (response.status == 200){
			console.log("Eliminado con exito")
		}
	}


	const getToDo = async () =>{
		let response = await fetch(URL_API+"/joselyngm",{
			headers:{
				"Content-Type":"application/json"
			},
			method:"GET",
		})
		let data = await response.json()
			
		setTasks(data)
	}

	// useEffect(() => {
	// 	putToDo()
	// }, [setTasks])

	const putToDo = async (newTasks) =>{
		
		let response = await fetch(URL_API+"/joselyngm",{
			headers:{
				"Content-Type":"application/json"
			},
			method:"PUT",
			body: JSON.stringify(newTasks) 
		})
		let data = await response.json()
		if (response.ok){
			// console.log(data)
			getToDo()
		}
	}
	// putToDo()
		
	// }, [setTasks])

  	return (
		<InputGroup className="container justify-content-center">
			<div className="titleBox">
				<h1 className="title" >To Dos</h1>
			</div>
			<div className="col-12 toDo">
				<Form.Control
				className="inputBoxToDo"
				placeholder="What needs to be done?"
				aria-label="Recipient's username"
				aria-describedby="basic-addon2"
				value={inputValue} 
				onChange={(e) =>{setInputValue(e.target.value)}}
				type="text"
				onKeyDown={handleAdd}/>
			</div>
			<div className="col-12">
				<ListGroup className="">
					{
						tasks.map((task,index)=>{
							return(
								<ListGroup.Item key={index} 
								className="d-flex justify-content-between align-items-start inputBoxToDo">
									<div className="ms-2 me-auto taskElement">
										{task.label}
        							</div>
									<div onClick={(e) => handleDelete(index)}>
										<i className="far fa-trash-alt deleteButton"></i>
									</div>
								</ListGroup.Item>
							)
						})
						
					}
				</ListGroup>
			</div>
			
      	</InputGroup>
  	);
}

export default Home;