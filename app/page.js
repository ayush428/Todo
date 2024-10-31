"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);

  async function gettingtodo() {
    try {
      const response = await fetch("/api/get-todo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json();
      const todoData = data.todo;
      setApiData(todoData);
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  useEffect(() => {
    gettingtodo();
  }, []);

  async function onclickHandler(id) {
    try {
      const response = await fetch(`/api/delete-todo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Todo deleted successfully");
      await gettingtodo();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-5 text-gray-100">
        <h1 className="text-5xl font-bold text-gray-100 mb-8">To-Do List</h1>
        <Link href="/add-todo">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 mb-10 transition duration-200 ease-in-out transform hover:scale-105 shadow-lg">
            + Add Todo
          </button>
        </Link>

        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : (
          apiData.map((todo) => (
            <div key={todo.id} className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 w-80 transition duration-200 hover:shadow-lg hover:bg-gray-700">
              <h2 className="text-2xl font-semibold text-gray-50 mb-2">{todo.title}</h2>
              <p className="text-gray-400 mb-4">{todo.description}</p>
              <div className="flex justify-between">
                <Link href={`/Edit-todo/${todo._id}`}>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 transform hover:scale-105"
                  >
                    Edit
                  </button>
                </Link>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 transform hover:scale-105"
                  onClick={() => onclickHandler(todo._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </>
  );
}
