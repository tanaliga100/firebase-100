import { addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import { IBook } from "../components/Todos/Todo";
import { booksCollection, db } from "../config/firebase.config";

export const useCrudBooks = () => {
  // GETTING ALL THE BOOKS || REALTIME !!!

  const getAllBooks = () => {
    onSnapshot(booksCollection, (snapshots) => {
      if (!snapshots.empty) {
        const books: IBook[] = [];
        snapshots.docs.forEach((book) => {
          books.push({
            id: book.id,
            name: book.data().name,
            author: book.data().author,
          });
        });
        return books;
      }
    });
  };

  // ADDING A BOOK
  const addBookHandler = async (data: IBook) => {
    // sanitize the data
    await addDoc(booksCollection, data);
    toast.success("Books Addded", {
      position: "bottom-left",
      autoClose: 300,
      theme: "light",
      hideProgressBar: true,
    });
  };

  // DELETING THE BOOK
  const deleteBookHandler = async (id: string) => {
    const docRef = doc(db, "books", id);
    await deleteDoc(docRef);
    toast.success("Books Deleted", {
      position: "bottom-left",
      autoClose: 300,
      theme: "light",
      hideProgressBar: true,
    });
  };

  return { addBookHandler, getAllBooks, deleteBookHandler };
};

// snapshots) => {
//       const books: IBook[] = [];
//       snapshots.forEach((book) => {
//         const data = book.data();
//         books.push({
//           id: book.id,
//           name: data.name,
//           author: data.author,
//         });
//       });
//       console.log("ALL", books);

//       return books;
