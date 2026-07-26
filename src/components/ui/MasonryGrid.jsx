// components/ui/MasonryGrid.jsx
import * as React from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
} from 'framer-motion';
import { cn } from '../../lib/utils.js';

// A self-contained GridItem component to handle the mouse-tracking parallax/tilt effect
const GridItem = ({ children }) => {
  const ref = React.useRef(null);

  // Motion values to track mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animations for smoother transform changes
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Transform mouse position into 3D rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    // Normalize mouse position to a range of -0.5 to 0.5
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className="relative"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileTap={{ scale: 0.95 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

/**
 * MasonryGrid
 * @param {Object} props
 * @param {Array} props.items - Array of items to render in the grid.
 * @param {(item: any, index: number) => React.ReactNode} props.renderItem - Render function for each item.
 * @param {string} [props.className] - Extra classes for the grid container.
 * @param {string} [props.gap='1rem'] - Column gap.
 * @param {number} [props.staggerDelay=0.05] - Stagger delay between item animations.
 */
const MasonryGrid = ({
  items,
  renderItem,
  className,
  gap = '1rem',
  staggerDelay = 0.05,
}) => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn('w-full', className)}
      style={{ columnGap: gap }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      role="list"
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id ?? index}
          className="mb-4 break-inside-avoid"
          variants={itemVariants}
          role="listitem"
        >
          {/* Wrapped in GridItem for the mouse-tilt/parallax effect */}
          <GridItem>{renderItem(item, index)}</GridItem>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MasonryGrid;