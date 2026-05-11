import { motion } from 'motion/react';

import type { ChildrenWrapperProps } from '@/types/common.types';

export default function Content({ children }: ChildrenWrapperProps) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'backIn' }}
      className="full-shadow my-4 flex flex-1 flex-col justify-start overflow-y-auto rounded-lg border p-4"
    >
      {children}
    </motion.main>
  );
}
