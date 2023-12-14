import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InputUser, handler } from "./userSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const LoginPage = () => {
  const dispatch = useDispatch();
  const userInput = useSelector(InputUser);
  const navigate = useNavigate();

  const inputHandler = (event) => {
    const { name, value } = event.target;
    dispatch(handler({ [name]: value }));
  };

  const tipsButton = () => {
    Swal.fire({
      title: "User API",
      html: `<h1>Use this api <span className='text-blue-800'>https://fakestoreapi.com/users</span> to get all user account in your browser or in your postname with GET method</h1>`,
    });
  };

  const loginButton = (e) => {
    e.preventDefault();
    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      body: JSON.stringify(userInput),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        let { token } = json;
        Cookies.set("token", token, { expires: 7 });
        Swal.fire({
          title: "Login Success!!",
          text: "Thank You!",
          icon: "success",
        });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          title: "Login Failed",
          text: "Try Again",
          icon: "error",
        });
      });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex flex-row justify-center">
          <h1 className="text-3xl font-bold text-white">
            <Link to={"/"}>
              <span className="text-yellow-300">Toko</span>Kita
            </Link>
          </h1>
        </div>

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={loginButton} method="POST">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                onChange={(e) => inputHandler(e)}
                name="username"
                type="text"
                autoComplete="username"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                onChange={(e) => inputHandler(e)}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="flex flex-row justify-end gap-2">
            <h1 className="text-sm items-center">Tips Login</h1>
            <button
              onClick={tipsButton}
              type="button"
              className="rounded-full bg-slate-300 h-[5%] w-[6%]"
            >
              ?
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link to={"/register"}>
            <a className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register Here
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
