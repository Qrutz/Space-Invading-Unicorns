// "use client";
// import { motion } from "framer-motion";
// import GlobeComponent from "./GlobeComponent"; // Adjust path if necessary

// export function GlobeDemo() {
//   return (
//     <div className="flex flex-row items-center justify-center py-20 h-screen md:h-auto dark:bg-black bg-white relative w-full">
//       <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] px-4">
//         {/* Framer Motion animation for entrance */}
//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 20,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//           }}
//           transition={{
//             duration: 1,
//           }}
//           className="div"
//         >
//           {/* Add any text or UI elements above the globe here */}
//           <h1 className="text-center text-3xl font-bold dark:text-white text-black mb-8">
//             Explore the Globe
//           </h1>
//         </motion.div>

//         {/* Adding gradient effect for visual interest */}
//         <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" />

//         {/* Globe Component */}
//         <div className="absolute w-full -bottom-20 h-72 md:h-full z-10">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1.5 }}
//           >
//             <GlobeComponent />
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }
