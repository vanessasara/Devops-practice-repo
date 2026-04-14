from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from pydantic import BaseModel
from typing import List, Optional
from bson import ObjectId

app = FastAPI()

client = MongoClient("mongodb://mongodb:27017")
db = client.todos_db
collection = db.todos


class Todo(BaseModel):
    text: str
    done: bool = False


class TodoUpdate(BaseModel):
    text: Optional[str] = None
    done: Optional[bool] = None


def serialize(doc) -> dict:
    return {
        "id": str(doc["_id"]),
        "text": doc["text"],
        "done": doc.get("done", False),
    }


@app.get("/api/todos", response_model=List[dict])
def get_todos():
    return [serialize(t) for t in collection.find()]


@app.post("/api/todos")
def add_todo(todo: Todo):
    result = collection.insert_one(todo.model_dump())
    return serialize(collection.find_one({"_id": result.inserted_id}))


@app.patch("/api/todos/{todo_id}")
def update_todo(todo_id: str, update: TodoUpdate):
    try:
        oid = ObjectId(todo_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ID")

    changes = {k: v for k, v in update.model_dump().items() if v is not None}
    if not changes:
        raise HTTPException(status_code=400, detail="No fields to update")

    result = collection.update_one({"_id": oid}, {"$set": changes})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Todo not found")

    return serialize(collection.find_one({"_id": oid}))


@app.delete("/api/todos/{todo_id}")
def delete_todo(todo_id: str):
    try:
        oid = ObjectId(todo_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ID")

    result = collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Todo not found")

    return {"status": "deleted"}