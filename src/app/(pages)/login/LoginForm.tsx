'use client'

export default function LoginForm() {
  //nút Clear
  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = e.currentTarget.form;
    if (form) {
      form.reset();
    }
  };

  return (
    <div className="w-[450px] bg-[#F0F0F0] p-6 border-2 border-gray-400 shadow-xl">
      <h3 className="text-center text-red-600 font-bold text-lg mb-6">
        Enter Username and Password
      </h3>
      <form>
        <div className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-800 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 bg-[#E6F0FF] border-2 border-gray-500 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 bg-[#E6F0FF] border-2 border-gray-500 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6 mb-4">
          <button
            type="submit"
            className="px-8 py-1.5 bg-[#337AB7] text-white font-semibold border border-gray-600 hover:bg-blue-700"
          >
            Login
          </button>
          <button
            onClick={handleClear}
            className="px-8 py-1.5 bg-[#C0C0C0] text-gray-800 font-semibold border border-gray-600 hover:bg-gray-400"
          >
            Clear
          </button>
        </div>

        {/* Not implement yet */}
        <a href="#" className="text-blue-600 hover:underline text-sm">
          Change password?
        </a>
      </form>
    </div>
  );
}