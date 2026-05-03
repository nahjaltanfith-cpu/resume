import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
};

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={false}
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.08, ease: "linear" }}
      className="pb-24 lg:pb-0"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
