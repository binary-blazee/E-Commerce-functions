import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <div className="flex flex-col gap-10 bg-[url('/src/assets/images/home.jpg')] h-[91.5vh] text-white">
        <div>
          <h2 className="text-center text-6xl font-bold mt-25 text-[#88fdfb]">Welcome To Shopify</h2>
        </div>
        <div className="mx-auto">
          <button className="border rounded-md px-5 py-1  bg-[#1e189e] text-white font-semibold  shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition duration-300 ease-in-out ring-2 ring-purple-300 hover:ring-purple-500">
            <Link to={"products"}>Shop Now!</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
