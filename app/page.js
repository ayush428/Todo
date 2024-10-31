"use client"
import Image from "next/image";
import Link from "next/link";
import { Router } from "next/router";
import { useEffect, useState } from "react";
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [apiData,setApiData]=useState([]);

  async function gettingtodo(){

    try {
      // Sending a POST request to the API endpoint to add the new todo
      console.log("todo");
      const response = await fetch("/api/get-todo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response)
      
      if (!response.ok) {
        throw new Error("Failed to add new todo");
      }
  
      const data = await response.json();
      const todoData = data.todo;
     console.log(todoData)  
      setApiData(todoData);
      setLoading(false)
      return data ;
      // Navigate back to home or todo list after successful submission
      
    } catch (error) {
      console.error("Error adding new todo:", error);
    } 
    // finally {
    //   setLoading(false);
    // }
  };
  useEffect(()=>{
    gettingtodo();
  },[])
  async function onclickHandler(id){
    try{
      const response = await fetch(`/api/delete-todo/${id }`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("todo deleted successful   ")
      console.log(response)
      await gettingtodo()
      
    }
    catch{
      console.error("Error adding new todo:", error);

    }
    
  }  
    
  


  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">To-Do</h1>
        <Link href="/add-todo">
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 mb-8">
          Add Todo
        </button>
        </Link>
        {loading ? (<>
        loading...
        </>):(<>
        
        {
          apiData.map((todo) =>(
            <div key={todo.id} className="bg-white p-4 rounded-lg shadow-md mb-4 w-80">
            <div className="bg-white p-6 rounded-lg shadow-md w-80 mb-5">
          <div className="text-xl font-semibold text-gray-900 mb-2">{todo.title}</div>
          <div className="text-gray-600 mb-4">{todo.description}</div>
          <div className="flex justify-between">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Edit
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" onClick={()=>{
              onclickHandler(todo._id)
            }}>
              Delete
            </button>
          </div>
        </div>
          </div>


          ))

        }

        </>)}
        

        {/* <div className="bg-white p-6 rounded-lg shadow-md w-80 mb-5">
          <div className="text-xl font-semibold text-gray-900 mb-2">Task Title</div>
          <div className="text-gray-600 mb-4">Task Description</div>
          <div className="flex justify-between">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Edit
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Delete
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md w-80 mb-5">
          <div className="text-xl font-semibold text-gray-900 mb-2">Task Title</div>
          <div className="text-gray-600 mb-4">Task Description</div>
          <div className="flex justify-between">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Edit
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Delete
            </button>
          </div>
        </div> */}
        

      </main>
    </>
  );
}
