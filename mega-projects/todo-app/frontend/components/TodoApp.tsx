"use client";

import { useEffect, useState, useRef } from "react";
import api from "@/api";

export interface Todo {
  id: string;
  text: string;
  done: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchTodos = async () => {
    try {
      const response = await api.get("/api/todos");
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  useEffect(() => { fetchTodos(); }, []);

  const addTodo = async () => {
    if (!input.trim()) return;
    try {
      await api.post("/api/todos", { text: input.trim(), done: false });
      setInput("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo", error);
    }
  };

  const toggleTodo = async (id: string, done: boolean) => {
    try {
      await api.patch(`/api/todos/${id}`, { done: !done });
      fetchTodos();
    } catch (error) {
      console.error("Error toggling todo", error);
    }
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = async (id: string) => {
    if (!editText.trim()) return;
    try {
      await api.patch(`/api/todos/${id}`, { text: editText.trim() });
      setEditingId(null);
      fetchTodos();
    } catch (error) {
      console.error("Error saving edit", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await api.delete(`/api/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  const clearCompleted = async () => {
    try {
      await Promise.all(
        todos.filter((t) => t.done).map((t) => api.delete(`/api/todos/${t.id}`))
      );
      fetchTodos();
    } catch (error) {
      console.error("Error clearing completed", error);
    }
  };

  const active = todos.filter((t) => !t.done);
  const done = todos.filter((t) => t.done);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-start justify-center px-4 py-16">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=Playfair+Display:ital,wght@1,700&display=swap');
        body { font-family: 'Sora', sans-serif; }
        .font-display { font-family: 'Playfair Display', serif; }
      `}</style>

      <div className="w-full max-w-lg">
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-zinc-500 mb-2">{today}</p>
          <h1 className="font-display text-5xl font-bold italic text-white leading-tight">
            Today&apos;s<br />
            <span className="text-emerald-400">notes.</span>
          </h1>
          <p className="mt-3 text-sm text-zinc-500">
            {active.length} task{active.length !== 1 ? "s" : ""} remaining
          </p>
        </div>

        <div className="flex mb-8 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 focus-within:border-emerald-500 transition-colors duration-200">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a new note..."
            className="flex-1 bg-transparent px-5 py-4 text-sm text-zinc-100 placeholder-zinc-600 outline-none"
          />
          <button
            onClick={addTodo}
            className="px-5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-colors duration-150 shrink-0"
          >
            + Add
          </button>
        </div>

        {loading && (
          <div className="text-center py-16 text-zinc-600 text-sm tracking-widest uppercase">
            Loading...
          </div>
        )}

        {!loading && todos.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-4 opacity-30">◇</div>
            <p className="text-zinc-600 text-sm tracking-widest uppercase">Nothing here yet</p>
          </div>
        )}

        {active.length > 0 && (
          <div className="mb-6">
            <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 mb-3 pl-1">Active</p>
            <ul className="flex flex-col gap-2">
              {active.map((todo) => (
                <TodoRow
                  key={todo.id}
                  todo={todo}
                  editingId={editingId}
                  editText={editText}
                  setEditText={setEditText}
                  onToggle={toggleTodo}
                  onEdit={startEdit}
                  onSave={saveEdit}
                  onCancel={() => setEditingId(null)}
                  onDelete={deleteTodo}
                />
              ))}
            </ul>
          </div>
        )}

        {done.length > 0 && (
          <div className="mb-6">
            <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 mb-3 pl-1">Completed</p>
            <ul className="flex flex-col gap-2">
              {done.map((todo) => (
                <TodoRow
                  key={todo.id}
                  todo={todo}
                  editingId={editingId}
                  editText={editText}
                  setEditText={setEditText}
                  onToggle={toggleTodo}
                  onEdit={startEdit}
                  onSave={saveEdit}
                  onCancel={() => setEditingId(null)}
                  onDelete={deleteTodo}
                />
              ))}
            </ul>
          </div>
        )}

        {done.length > 0 && (
          <div className="flex justify-end mt-4">
            <button
              onClick={clearCompleted}
              className="text-xs text-zinc-600 hover:text-rose-400 underline underline-offset-4 transition-colors duration-150"
            >
              Clear completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function TodoRow({
  todo, editingId, editText, setEditText,
  onToggle, onEdit, onSave, onCancel, onDelete,
}: {
  todo: Todo;
  editingId: string | null;
  editText: string;
  setEditText: (t: string) => void;
  onToggle: (id: string, done: boolean) => void;
  onEdit: (todo: Todo) => void;
  onSave: (id: string) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
}) {
  const isEditing = editingId === todo.id;

  return (
    <li
      className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-150
        ${todo.done
          ? "bg-zinc-900/40 border-zinc-800/50 opacity-50"
          : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
        }`}
    >
      <button
        onClick={() => onToggle(todo.id, todo.done)}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-150
          ${todo.done
            ? "bg-emerald-500 border-emerald-500 text-zinc-950"
            : "border-zinc-600 hover:border-emerald-500"
          }`}
      >
        {todo.done && (
          <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {isEditing ? (
        <input
          autoFocus
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSave(todo.id);
            if (e.key === "Escape") onCancel();
          }}
          className="flex-1 bg-transparent text-sm text-zinc-100 outline-none border-b border-emerald-500 pb-0.5"
        />
      ) : (
        <span className={`flex-1 text-sm leading-relaxed ${todo.done ? "line-through text-zinc-600" : "text-zinc-200"}`}>
          {todo.text}
        </span>
      )}

      <div className={`flex gap-1 transition-opacity duration-150 ${isEditing ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
        {isEditing ? (
          <>
            <button onClick={() => onSave(todo.id)} className="w-7 h-7 rounded-lg flex items-center justify-center text-emerald-400 hover:bg-emerald-500/10 transition-colors text-xs font-bold">✓</button>
            <button onClick={onCancel} className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:bg-zinc-800 transition-colors text-xs">✕</button>
          </>
        ) : (
          <>
            <button onClick={() => onEdit(todo)} title="Edit" className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors">
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                <path d="M11.5 2.5l2 2-9 9H2.5v-2l9-9z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
              </svg>
            </button>
            <button onClick={() => onDelete(todo.id)} title="Delete" className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors">
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </>
        )}
      </div>
    </li>
  );
}