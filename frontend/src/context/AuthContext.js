import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const initial_state = {
  user: null,
  loading: true,
  error: null,
};

export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { user: null, loading: true, error: null };

    case "LOGIN_SUCCESS":
      return { user: action.payload, loading: false, error: null };

    case "LOGIN_FAILURE":
      return { user: null, loading: false, error: action.payload };

    case "REGISTER_SUCCESS":
      return { user: null, loading: false, error: null };

    case "LOGOUT":
      return { user: null, loading: false, error: null };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  // 🔄 Check auth state on page load
  useEffect(() => {
    const fetchUser = async () => {
      dispatch({ type: "LOGIN_START" });

      try {
        const res = await axios.get(`${BASE_URL}/auth/me`, {
          withCredentials: true,
        });

        if (res.data?.data) {
          console.log("✅ Logged in user:", res.data.data);
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });
        } else {
          console.warn("⚠️ No user data received");
          dispatch({ type: "LOGIN_FAILURE", payload: "No user found" });
        }
      } catch (err) {
        console.error("❌ Auth check failed:", err.response?.data || err.message);
        dispatch({ type: "LOGIN_FAILURE", payload: "Unauthorized or server error" });
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
