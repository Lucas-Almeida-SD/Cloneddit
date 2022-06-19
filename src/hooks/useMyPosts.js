import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/Provider";
import { database } from "../services/firebase";

export function useMyPosts() {
  const [myPosts, setMyPosts] = useState();
  const { user, setIsFetching } = useContext(MyContext);

  useEffect(() => {
    setIsFetching(true);
    const getMyPost = async () => {
      const myPostsRef = database.ref(`/allPosts/${user.id}`);

      myPostsRef.on('value', posts => {
        let databaseMyPosts;
        if (posts.exists()) {
          databaseMyPosts = [posts.val()];
        } else {
          databaseMyPosts = [{}];
        }

        setMyPosts(databaseMyPosts);
        setIsFetching(false);
      });
    }
    getMyPost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { myPosts };
}