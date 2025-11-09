import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { AUTH_API } from "../../utils/constants";
import { resetAuthState, setLoading, setToken } from "../../slices/authSlice";
import { resetProfileState, setUser } from "../../slices/profileSlice";

const {
  SIGNUP: SIGNUP_API,
  LOGIN: LOGIN_API,
  LOGOUT: LOGOUT_API,
} = AUTH_API;

export const signup =
  (signupData, navigate) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const toastId = toast.loading("Creating your account...");

      const response = await apiConnector({
        method: "POST",
        url: SIGNUP_API,
        bodyData: signupData,
      });

      toast.dismiss(toastId);
      toast.success(response?.data?.message || "Signup successful");

      navigate("/login");
    } catch (error) {
      toast.dismiss();
      const message =
        error?.data?.message || "Signup failed. Please try again later.";
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const login =
  (email, password, navigate) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const toastId = toast.loading("Signing you in...");

      const response = await apiConnector({
        method: "POST",
        url: LOGIN_API,
        bodyData: { email, password },
      });

      toast.dismiss(toastId);

      const token = response?.data?.token;
      const user = response?.data?.user;

      if (!token || !user) {
        throw new Error("Invalid login response");
      }

      dispatch(setToken(token));
      dispatch(setUser(user));
      toast.success(response?.data?.message || "Logged in successfully");

      navigate("/");
    } catch (error) {
      toast.dismiss();
      const message =
        error?.data?.message ||
        error?.message ||
        "Login failed. Please try again.";
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const logout =
  (navigate) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const toastId = toast.loading("Signing you out...");

      await apiConnector({
        method: "POST",
        url: LOGOUT_API,
      });

      toast.dismiss(toastId);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.dismiss();
      const message =
        error?.data?.message ||
        error?.message ||
        "Logout failed. Clearing session locally.";
      toast.error(message);
    } finally {
      dispatch(resetAuthState());
      dispatch(resetProfileState());
      dispatch(setLoading(false));
      if (navigate) {
        navigate("/login");
      }
    }
  };

