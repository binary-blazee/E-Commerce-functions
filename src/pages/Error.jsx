import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <h1 className="font-extrabold text-9xl">404 NOT FOUND</h1>
      <button className="my-15 border rounded-md px-4 py-2">
        <Link className="cursor-pointer" to={"/"}>
          Go to Home page{" "}
        </Link>
      </button>
    </div>
  );
}

export default Error;
