'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const todo = { title, description };

    try {
      console.log(todo);
      const response = await fetch("/api/add-todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        throw new Error("Failed to add new todo");
      }

      const data = await response.json();
      console.log("New Todo Created:", data);

      router.push("/");
    } catch (error) {
      console.error("Error adding new todo:", error);
      alert("Failed to add todo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-5">
      <h1 className="text-4xl font-bold text-gray-100 mb-6">Add New Todo</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <div className="mb-6">
          <label className="block text-gray-300 font-semibold mb-2" htmlFor="title">
            Task Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            placeholder="Enter task title"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 font-semibold mb-2" htmlFor="description">
            Task Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            placeholder="Enter task description"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-600 text-white px-6 py-2 rounded-lg w-full transition duration-200 ease-in-out transform ${
            loading ? "cursor-not-allowed opacity-50" : "hover:bg-blue-700 hover:scale-105"
          }`}
          disabled={loading}
        >
          {loading ? "Adding Task..." : "Add Task"}
        </button>
      </form>
    </main>
  );
}
