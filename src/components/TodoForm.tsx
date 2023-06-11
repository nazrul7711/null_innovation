import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { deleteTodo, updateTodo, addTodo } from "../store/TodoSlice";
import { fetchTodos } from "../store/TodoSlice";
import style from "./TodoForm.module.css";
import { AuthActions } from "../store/AuthSlice";


function TodoForm() {
  const [task, setTask] = useState<string>("");
  const todoArr = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  async function addTaskHandler(task: string) {
    dispatch(addTodo(task));
  }

  async function updateHandler(id: string) {
    dispatch(updateTodo(id));
  }

  async function deleteHandler(id: string) {
    dispatch(deleteTodo(id));
  }
  function logoutHandler(){
    console.log("kill bill")
    dispatch(AuthActions.logout())
  }

  return (
    <>
      <div className={style.header}>
        <h1>Null Innovations</h1>
        <button onClick={logoutHandler}>Logout</button>
      </div>
      <div className={style.container}>
        <div className={style.task}>
          <input
            type="text"
            placeholder="Task..."
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />
          <button onClick={() => addTaskHandler(task)}>Add Item</button>
        </div>
        <table>
          <tbody>
            {todoArr.Todo.todos.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>
                  {item.completed ? (
                    "Done"
                  ) : (
                    <button onClick={() => updateHandler(item.id)}>
                      Mark Complete
                    </button>
                  )}
                </td>
                <td>
                  <button onClick={() => deleteHandler(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TodoForm;
