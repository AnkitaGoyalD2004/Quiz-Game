// "use client";

// import Quiz from "./components/Quiz";

// export default function Home() {
//   return (
//     <div className="p-5">
//       <h2 className="text-2xl font-bold mb-4">Start Your Quiz</h2>
//       <Quiz />
//     </div>
//   );
// }
import { Quiz } from "./components/Quiz";

export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-center mb-5">Interactive Quiz</h1>
      <Quiz />

    </div>
  );
}
