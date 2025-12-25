import { useEffect, useState } from "react";
import { getUserData } from "../https";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const useLoadData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUserData();
        console.log("User Data:", data);

        const { _id, name, email, phone, role } = data.data;
        dispatch(setUser({ _id, name, email, phone, role })); // Update user state in Redux
      } catch (error) {
        dispatch(removeUser());
        navigate("/auth");
        console.log(error);
      } finally {
        // setTimeout(() => {
            setIsLoading(false);
        // }, 500);
      }
    };

    fetchUser();
  }, [dispatch, navigate]);

  return isLoading;
};

export default useLoadData;
