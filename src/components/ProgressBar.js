// without {} in UploadForm
// export default function ProgressBar() {
//   return (
//     <div className="progress-bar">ProgressBar</div>
//   )
// }
import { useEffect } from "react";
import { useStorage } from "../hooks/useStorage";
import {motion} from 'motion/react'

export const ProgressBar = ({file, setFile}) => {
    const { progress, url } = useStorage(file);

    useEffect (() => {
     if (url) {
  setTimeout(() => {
    setFile(null);
  }, 700);
}
    }, [url, setFile])
      return (
    <motion.div 
    className="progress-bar"
    initial={{width:0}}
    animate={{width: progress + '%'}}
    >
    </motion.div>
  )
}
