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
    <div className="flex min-h-[80vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8 animate-fade-in-up">
      <div className="sm:mx-auto sm:w-full sm:max-w-md glass-panel p-8 sm:p-10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.3)] relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-primary rounded-full mix-blend-screen filter blur-[60px] opacity-30"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-accent rounded-full mix-blend-screen filter blur-[60px] opacity-30"></div>

        <div className="relative z-10">
            <div className="flex flex-row justify-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight">
                <Link to={"/"} className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">Toko</span>
                <span className="text-slate-900 dark:text-white transition-colors duration-300">Kita</span>
                </Link>
            </h1>
            </div>

            <h2 className="mb-8 text-center text-2xl font-bold leading-9 tracking-tight text-slate-800 dark:text-gray-100">
            Sign in to your account
            </h2>

            <form className="space-y-6" onSubmit={loginButton} method="POST">
            <div>
                <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-slate-700 dark:text-gray-300 ml-1"
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
                    className="block w-full rounded-xl border-0 bg-white dark:bg-brand-secondary/50 py-3 px-4 text-slate-800 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-white/10 placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6 transition-all"
                    placeholder="Enter your username"
                />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between ml-1">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-slate-700 dark:text-gray-300"
                >
                    Password
                </label>
                <div className="text-sm">
                    <a
                    href="#"
                    className="font-semibold text-brand-primary hover:text-brand-accent transition-colors"
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
                    className="block w-full rounded-xl border-0 bg-white dark:bg-brand-secondary/50 py-3 px-4 text-slate-800 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-white/10 placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6 transition-all"
                    placeholder="••••••••"
                />
                </div>
            </div>
            <div className="flex flex-row justify-end items-center gap-2 mt-2">
                <h1 className="text-xs text-slate-500 dark:text-gray-400">Login Tips</h1>
                <button
                onClick={tipsButton}
                type="button"
                className="rounded-full bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-600 dark:text-gray-300 w-6 h-6 flex items-center justify-center text-xs font-bold transition-colors border border-slate-300 dark:border-white/10"
                >
                ?
                </button>
            </div>
            <div className="pt-2">
                <button
                type="submit"
                className="flex w-full justify-center rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent px-3 py-3 text-sm font-semibold leading-6 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary transition-all transform active:scale-95"
                >
                Sign in
                </button>
            </div>
            </form>

            <p className="mt-8 text-center text-sm text-slate-600 dark:text-gray-400">
            Not a member?{" "}
            <Link to={"/register"} className="font-semibold leading-6 text-brand-primary hover:text-brand-accent transition-colors">
                Register Here
            </Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
