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
import { MdDelete } from "react-icons/md";
import styled from "styled-components";
import { db } from "../../config/firebase.config";

interface Todo {
  id?: string;
  title?: string;
  completed?: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      const updatedTodos: Todo[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(updatedTodos);
    });

    return () => unsubscribe();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() === "") return;
    const todoData = {
      title: newTodo,
      completed: false,
    };
    await addDoc(collection(db, "todos"), todoData);
    setNewTodo("");
  };

  const deleteTodo = async (id: string | undefined) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const toggleCompletion = async (id: string) => {
    const todoRef = doc(db, "todos", id);
    const todoSnapshot = await getDocs<unknown>(todoRef);
    if (!todoSnapshot.exists()) return;

    const todoData = todoSnapshot.data();
    await updateDoc(todoRef, { completed: !todoData.completed });
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h1>Todo App</h1>
      <Controls>
        <SearchInput
          type="text"
          placeholder="Search todos by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <AddTodoForm
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
        >
          <input
            type="text"
            placeholder="Add a new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <AddButton type="submit">Add</AddButton>
        </AddTodoForm>
      </Controls>
      <TodoList>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id}>
            <TodoText
              completed={todo.completed}
              onClick={() => toggleCompletion(todo.id)}
            >
              {todo.title}
            </TodoText>
            <DeleteButton onClick={() => deleteTodo(todo.id)}>
              <MdDelete />
            </DeleteButton>
          </TodoItem>
        ))}
      </TodoList>
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <h2>This is a Modal</h2>
            <p>Modal content goes here.</p>
            <CloseButton onClick={() => setIsModalOpen(false)}>
              Close
            </CloseButton>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

const Container = styled.div`
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 5px;
  font-size: 16px;
`;

const AddTodoForm = styled.form`
  display: flex;
  gap: 10px;
`;

const AddButton = styled.button`
  background-color: #0074d9;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TodoItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
`;

const TodoText = styled.span<{ completed: boolean }>`
  flex-grow: 1;
  cursor: pointer;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`;

const DeleteButton = styled.button`
  background-color: #ff4136;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #888;
`;

export default App;
