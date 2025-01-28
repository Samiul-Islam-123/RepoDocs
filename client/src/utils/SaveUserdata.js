import axios from "axios";
import Cookies from "js-cookie"

const SaveUserData = async (userData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/save-user`,
      userData
    );

    // Check the response for success
    if (!response.data.success) {
      alert(response.data.message);
    } else {
      console.log("Server response : ", response.data);
      Cookies.set('token', response.data.token);
    }
  } catch (error) {
    console.error("Error saving user data:", error);

    // Show a user-friendly error message
    alert("An error occurred while saving user data. Please try again.");
  }
};

export default SaveUserData;
