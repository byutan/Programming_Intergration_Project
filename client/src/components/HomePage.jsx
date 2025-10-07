// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 1.5,
        ease: "easeOut"
      }}
      className="flex justify-center min-h-screen text-black font-bold font-nunito bg-gray-50 text-3xl mt-16"
    >
      Kết nối tới freelancer uy tín và tìm kiếm khách hàng tiềm năng
    </motion.div>
  );
}
