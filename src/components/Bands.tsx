// import { onSnapshot } from "firebase/firestore";
// import React, { useState } from "react";
// import { bandsRef } from "../config/firebase.config";

// interface Band {
//   id: string;
//   band: {
//     name: string;
//     founded: number;
//     members: number;
//     grammy: boolean;
//   };
// }
// const Bands = () => {
//   // states
//   const [bands, setBands] = useState<Band[]>([]);
//   // function call

//   const fetchBooks = () => {
//     const bandsData: Band[] = [];
//     onSnapshot(bandsRef, (snapshot) => {
//       snapshot.docs.map((data) => {
//         if (data.exists()) {
//           console.log("data", data.data());
//           const { name, members, founded, grammy } = data.data();
//           bandsData.push({
//             id: data.id,
//             band: {
//               name: name,
//               founded: founded,
//               members: members,
//               grammy: grammy,
//             },
//           });
//         }
//       });
//     });
//     setBands(bandsData);
//   };

//   React.useEffect(() => {
//     fetchBooks();
//   }, []);

//   //   if (bands.band.length === 0) {
//   //     return <h1>No Bands Are Listed</h1>;
//   //   }
//   //   if (!bands) {
//   //     return <h1>Loading...</h1>;
//   //   }

//   console.log("states", bands);

//   return (
//     <div>
//       <p>List of Bands</p>
//       <ul>
//         {bands.map((band) => (
//           <li key={band.id}>
//             Name : {band.band.name} - Grammy: {Boolean(band.band.grammy)} -
//             Members: {band.band.members}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
// export default Bands;

import {
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { bandsRef } from "../config/firebase.config";
import Search from "./Search";

interface Band {
  id: string;
  name: string;
  founded: number;
  members: number;
  grammy: boolean;
}

const Bands = () => {
  const [bands, setBands] = useState<Band[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onSnapshot(bandsRef, (snapshot) => {
      try {
        const bandsData: Band[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBands(bandsData);
        setLoading(false);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // delete bands

  async function handleDelete(idToDelete: string) {
    try {
      const bandDocRef = doc(bandsRef, idToDelete);

      await deleteDoc(bandDocRef);
      setBands((prev) => prev.filter((band) => band.id !== idToDelete));
    } catch (error) {
      console.log(error);
    }
  }

  async function updateHandler(idToUpdate: string) {
    console.log("data to updated", idToUpdate);

    try {
      const bandDocRef = doc(bandsRef, idToUpdate);
      await updateDoc(bandDocRef, {
        name: "New Band",
        members: 3,
        grammy: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function searchBands() {
    try {
      const q = query(bandsRef, where("name", "==", searchTerm.toLowerCase()));
      const querySnap = await getDocs(q);

      const foundBands: Band[] = querySnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      +-setBands(foundBands);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (searchTerm === "") {
      setBands([]); // Clear the bands list
    } else {
      searchBands(); // Perform the search
    }
  }, [searchTerm]);

  console.log("search functionalities", searchTerm);

  return (
    <Wrapper>
      <p>List of Bands</p>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search for bands"
      />
      <List>
        {bands.map((band) => (
          <li key={band.id}>
            <pre>
              Name: {band.name} - Grammy: {String(band.grammy)} - Members:{" "}
              {band.members}
            </pre>

            <Actions>
              <button onClick={() => handleDelete(band.id)}>
                Delete this bands
              </button>
              <button onClick={() => updateHandler(band.id)}>Update Doc</button>
            </Actions>
          </li>
        ))}
      </List>
    </Wrapper>
  );
};
export default Bands;

const Wrapper = styled.main`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
const List = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  li {
    display: flex;
  }
`;
const Actions = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: row;
`;
