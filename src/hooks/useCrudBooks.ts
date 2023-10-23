import { addDoc, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { IBook } from "../components/Todos/Todo";
import { booksCollectionRef, db } from "../config/firebase.config";

export const useCrudBooks = () => {
  // GETTING ALL THE BOOKS || REALTIME !!!

  //   const getAllBooks = () => {
  //     onSnapshot(booksCollection, (snapshots) => {
  //       if (!snapshots.empty) {
  //         const books: IBook[] = [];
  //         snapshots.docs.forEach((book) => {
  //           books.push({
  //             id: book.id,
  //             name: book.data().name,
  //             author: book.data().author,
  //           });
  //         });
  //         setBooks(books);
  //         return books;
  //       }
  //     });
  //   };

  // ADDING A BOOK
  const addBookHandler = async (data: IBook) => {
    // sanitize the data
    console.log("BOOK TO ADD", data);

    await addDoc(booksCollectionRef, data);
    toast.success("Books Addded", {
      position: "bottom-left",
      autoClose: 300,
      theme: "dark",
      type: "default",
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
      theme: "dark",
      type: "default",
      hideProgressBar: true,
    });
  };

  // SEARCHING THE BOOK
  const searchHandler = async (input: string) => {
    console.log("from hooks", input);
  };

  return { addBookHandler, deleteBookHandler, searchHandler };
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
