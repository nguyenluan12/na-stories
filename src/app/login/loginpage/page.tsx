import Link from "next/link";


export default function Loginpage() {

  return (
      <div>
          
          <div className="flex items-center justify-center min-h-screen ">
                  <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                      
                      <div>
                          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                          <p className="text-center">Attention, you cannot login with your Duolingo account.</p>
                          <p className="text-center">You have to register for the unofficial stories separately, as they are an independent project.</p>
                      </div>
                      <div className="mb-2">
                          <input
                              type="text"
                              placeholder="Username"
                              className="w-full p-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
                          />
                      </div>
                      <div className="mb-2">
                          <input
                              type="password"
                              placeholder="Password"
                              className="w-full p-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
                          />
                      </div>
                      <Link href="/home">
                        <button
                          type="submit"
                          className="w-full p-1 my-2 border-2 border-blue-500 rounded-xl bg-blue-500 text-white font-semibold text-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
                          >
                          Login
                          </button>
                      </Link>
                      <div className="flex ">
                          <p>Don't have an account?</p>
                          <p className="px-2 text-blue-400 cursor-pointer">Sign Up</p>
                      </div>
                      <div className="flex ">
                          <p>Forgot Password?</p>
                          <p className="px-2 text-blue-400 cursor-pointer">Reset</p>
                      </div>
                  </form>
              </div>

      </div>
  );
}