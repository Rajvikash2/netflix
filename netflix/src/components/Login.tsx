import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const res = await fetch(
                    "https://www.googleapis.com/oauth2/v1/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${response.access_token}`,
                        },
                    }
                );
                if (!res.ok) {
                    throw new Error("Failed to fetch user info");
                }

                const userData = await res.json();
                const { id: userid, email } = userData;
                console.log("Google Res =>", res);
                console.log("User ID =>", userid);
                localStorage.setItem("userid", userid);
                localStorage.setItem("email", email);
                console.log("Email =>", email);
                navigate("/");
            } catch (err) {
                console.error(err);
            }
        }
    })

    return (
        <div>
            <p>Google Auth</p>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    if (credentialResponse?.credential) {
                        const decoded = jwtDecode(credentialResponse?.credential);
                        console.log(decoded);
                    } else {
                        console.error('Credential is undefined');
                    }
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
            <div className="py-5 w-72 max-w-md mt-10 space-y-1 border bg-white rounded flex flex-col items-center justify-center ">
                <button
                    className="bg-white text-gray-700 rounded-lg flex items-center justify-center px-4 py-2 hover:bg-gray-100"
                    onClick={() => login()}
                >
                    Continue with Google
                </button>
            </div>
        </div>
    )
}

export default Login