import {motion} from "motion/react"

export const Modal = ({
  selectedImg,
  setSelectedImg,
}) => {
  return (
    <motion.div
      className="backdrop"
      onClick={() => setSelectedImg(null)}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
    >
      <motion.img
        src={selectedImg}
        alt="enlarged pic"
        onClick={(e) => e.stopPropagation()}
        initial={{y: '-30vh'}}
        animate={{y: 0}}
      />
    </motion.div>
  );
};