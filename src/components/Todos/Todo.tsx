// import { collection, onSnapshot } from "firebase/firestore";
// import React from "react";
// import styled from "styled-components";
// import { fireStore } from "../../config/firebase.config";

// interface Todo {
//   id: string | number;
//   title: string;
//   completed: boolean;
//   createdAt: string;
// }

// const Todo: React.FC = () => {
//   // define the states
//   const [todos, setTodos] = React.useState<Todo[]>([]);
//   const [newTodo, setNewTodo] = React.useState<string>("");
//   const [searchTerm, setSearchTerm] = React.useState<string>("");

//   // invoke the snapshotes | onload
//   React.useEffect(() => {
//     const collRef = collection(fireStore, "todos");
//     const unsub = onSnapshot(collRef, (snapshot) => {
//       const updatedTodos: Todo[] = [];
//       snapshot.forEach((doc) => {
//         const todoData = doc.data();
//         updatedTodos.push({
//           id: doc.id,
//           title: doc.data().title,
//           completed: doc.data().completed,
//           createdAt: doc.data().createdAt,
//         });
//       });
//       setTodos(updatedTodos);
//     });
//     return () => unsub();
//   }, []);
//   console.log("currentTodos", todos);

//   // ADD TODO
//   async function addTodo() {}

//   async function updateTodoTitle(id: string, value: string) {}

//   async function toggleTodoCompletion(id: string) {}

//   async function deleteTodo(id: string) {}

//   async function filteredTodos() {
//     todos.filter((todo) =>
//       todo.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }

//   return (
//     <Wrapper>
//       <h1>Todo App</h1>
//       <div>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             console.log("to submit", newTodo);
//             setNewTodo("");
//             //   addTodo();
//           }}
//         >
//           <input
//             type="text"
//             placeholder="Search todos by title"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Add a new todo"
//             value={newTodo}
//             onChange={(e) => setNewTodo(e.target.value)}
//           />
//           <button type="submit">Add</button>
//         </form>
//       </div>
//       <ul>
//         {todos &&
//           filteredTodos.map((todo: Todo) => (
//             <li key={todo.id}>
//               <span
//                 style={{
//                   textDecoration: todo.completed ? "line-through" : "none",
//                 }}
//                 onClick={() => toggleTodoCompletion(todo.id)}
//               >
//                 {todo.title}
//               </span>
//               <input
//                 type="text"
//                 value={todo.title}
//                 onChange={(e) => updateTodoTitle(todo.id, e.target.value)}
//               />
//               <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//             </li>
//           ))}
//       </ul>
//     </Wrapper>
//   );
// };
// export default Todo;

// const Wrapper = styled.main`
//   width: 90%;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   text-align: center;

//   form {
//     display: flex;
//     justify-content: center;
//     flex-direction: column;
//     width: 60%;
//     margin: 0 auto;
//     gap: 1rem;

//     input {
//       padding: 0.3rem;
//     }
//     button {
//       background-color: orange;
//       border: none;
//       padding: 0.5rem;
//     }
//   }
// `;

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { fireStore } from "../../config/firebase.config";

// Define the data structure
interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(fireStore, "todos"),
      (snapshot) => {
        const updatedTodos: Todo[] = [];
        snapshot.forEach((doc) => {
          const todoData = doc.data();
          updatedTodos.push({
            id: doc.id,
            title: todoData.title,
            completed: todoData.completed,
          });
        });
        setTodos(updatedTodos);
      }
    );

    return () => unsubscribe();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() === "") return;
    const todoData = {
      title: newTodo,
      completed: false,
    };
    await addDoc(collection(fireStore, "todos"), todoData);
    setNewTodo("");
  };

  const toggleTodoCompletion = async (id: string) => {
    const todoRef = doc(fireStore, "todos", id);
    const todoSnapshot = await getDocs(todoRef);
    if (!todoSnapshot.exists()) return;

    const todoData = todoSnapshot.data();
    await updateDoc(todoRef, { completed: !todoData.completed });
  };

  const updateTodoTitle = async (id: string, newTitle: string) => {
    const todoRef = doc(fireStore, "todos", id);
    await updateDoc(todoRef, { title: newTitle });
  };

  const deleteTodo = async (id: string) => {
    const todoRef = doc(fireStore, "todos", id);
    await deleteDoc(todoRef);
  };

  // Search functionality
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
        >
          <input
            type="text"
            placeholder="Search todos by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="text"
            placeholder="Add a new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </div>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
              onClick={() => toggleTodoCompletion(todo.id)}
            >
              {todo.title}
            </span>
            <input
              type="text"
              value={todo.title}
              onChange={(e) => updateTodoTitle(todo.id, e.target.value)}
            />
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
