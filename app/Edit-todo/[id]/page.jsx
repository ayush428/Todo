'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditTodo({ params }) {
  const { id } = params;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(`/api/todos/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch todo data");
        }
        const todo = await response.json();
        setTitle(todo.title);
        setDescription(todo.description);
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };
    fetchTodo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const status = 0;
    const todo = { title, description, status };

    try {
      const response = await fetch(`/api/updatetodo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const data = await response.json();
      console.log("Todo Updated:", data);
      router.push("/");
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Failed to update todo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-5">
      <h1 className="text-4xl font-bold text-gray-100 mb-6">Edit Todo</h1>
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
          {loading ? "Updating Todo..." : "Update Todo"}
        </button>
      </form>
    </main>
  );
}
