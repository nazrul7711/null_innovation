import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase-config";


import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface todoState {
  todos: Task[];
}

let initialState: todoState = {
  todos: [],
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const dbRef = collection(db, "tasks");
  const response = await getDocs(dbRef);

  return response.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Task));
});

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (task: string) => {
    const response = await addDoc(collection(db, "tasks"), {
      title: task,
      completed: false,
    });
    let id = response.id;
    return { id: id, title: task, completed: false };
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (id: string) => {
    await updateDoc(doc(db, "tasks", id), {
      completed: true,
    });
    const dbRef = collection(db, "tasks");
    const response = await getDocs(dbRef);

    return response.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Task));
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
    const dbRef = collection(db, "tasks");
    const response = await getDocs(dbRef);

    return response.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Task));
  }
);

const TodoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
    }),
      builder.addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      }),
      builder.addCase(updateTodo.fulfilled, (state, action) => {

        state.todos = action.payload;
      }),
      builder.addCase(deleteTodo.fulfilled, (state, action) => {

        state.todos = action.payload;
      });
  },
});

export const TodoActions = TodoSlice.actions;
export default TodoSlice;
