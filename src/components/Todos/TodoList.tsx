// import React, { useState } from "react";

// interface IProps {
//   todo: any[];
//   toggleComplete: () => void;
//   handleEdit: () => void;
//   handleDelete: () => void;
// }

// const TodoList: React.FC<IProps> = ({
//   todo,
//   toggleComplete,
//   handleDelete,
//   handleEdit,
// }) => {
//   const [newTitle, setNewTitle] = useState<string>("");

//   function handleChange(e: React.FormEvent<HTMLInputElement>) {
//     e.preventDefault();
//     if (todo.completed === true) {
//       setNewTitle(todo.Subject);
//     } else {
//       todo.Subject = "";
//       setNewTitle(e.target.value);
//     }
//   }

//   return (
//     <div>
//       <input type="text" onChange={handleChange} />
//       <section>
//         <button onClick={() => toggleComplete(todo)}>Completed</button>
//         <button onClick={() => handleEdit(todo, newTitle)}>Edit</button>
//         <button onClick={() => handleDelete(todo.id)}>Delete</button>
//       </section>
//     </div>
//   );
// };
// export default TodoList;
