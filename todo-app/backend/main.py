from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from uuid import uuid4

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_TODOS: dict[str, dict] = {}


class Todo(BaseModel):
    text: str
    done: bool = False


class TodoUpdate(BaseModel):
    text: Optional[str] = None
    done: Optional[bool] = None


def _normalize(todo_id: str, doc: dict) -> dict:
    return {"id": todo_id, "text": doc["text"], "done": bool(doc.get("done", False))}


@app.get("/api/todos", response_model=List[dict])
def get_todos():
    return [_normalize(todo_id, doc) for todo_id, doc in _TODOS.items()]


@app.post("/api/todos")
def add_todo(todo: Todo):
    todo_id = uuid4().hex
    _TODOS[todo_id] = todo.model_dump()
    return _normalize(todo_id, _TODOS[todo_id])


@app.patch("/api/todos/{todo_id}")
def update_todo(todo_id: str, update: TodoUpdate):
    if todo_id not in _TODOS:
        raise HTTPException(status_code=404, detail="Todo not found")
    changes = update.model_dump(exclude_unset=True)
    if not changes:
        raise HTTPException(status_code=400, detail="No fields to update")
    _TODOS[todo_id].update(changes)
    return _normalize(todo_id, _TODOS[todo_id])


@app.delete("/api/todos/{todo_id}")
def delete_todo(todo_id: str):
    if todo_id not in _TODOS:
        raise HTTPException(status_code=404, detail="Todo not found")
    del _TODOS[todo_id]
    return {"status": "deleted"}