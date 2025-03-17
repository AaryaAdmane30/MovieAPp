import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useProfileMutation } from "../../redux/api/userSlice";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoadingUpdateProfile }] = useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not  Match !");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();

        //  dispatch fro used to send an action to the Redux store update the Redux store with user credentials (such as username, email, or authentication token).

        dispatch(setCredentials({ ...res }));
        toast.success("Profile Updated Sucessfully!");
      } catch (error) {
        console.log(error);
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div>
      <div className=" container mx-auto p-4 mt-[10rem]">
        <div className="flex justify-center items-center md:flex md:space-x-4 ">
          <div className="md: w-1/3 ">
            <h2 className="text-2xl font-semibold mb-1 -mt-30">
              {/*  -mt-7 _-m for up )  */}
              Update Profile
            </h2>

            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label className="block text-white mb-1 ">Name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="form-input p-4 rounded-sm w-full"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="form-input p-4 rounded-sm w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-white mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="form-input p-4 rounded-sm w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-white mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Confirm Password"
                  className="form-input p-4 rounded-sm w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-between">
                <button
                  disabled={isLoadingUpdateProfile}
                  type="submit"
                  className="bg-blue-500 w-screen mt-[2rem] font-bold text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  {isLoadingUpdateProfile ? "Submitting..." : "Update"}
                </button>
                {isLoadingUpdateProfile && <Loader />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
