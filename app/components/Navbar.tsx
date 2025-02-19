import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Quiz Platform</h1>
      <div>
        <Link href="/" className="mr-4 hover:underline">Play Quiz</Link>
        <Link href="/history" className="hover:underline">History </Link>
      </div>
    </nav>
  );
};

export default Navbar;
