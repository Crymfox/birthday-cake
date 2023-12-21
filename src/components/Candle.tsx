import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Candle: React.FC<{style?: React.CSSProperties, out?: boolean, handleFlameClick: () => void, handleBodyClick: () => void}> = ({style, out, handleFlameClick, handleBodyClick}) => {
    return (
        <div className={`container rounded-md hover:cursor-crosshair relative`} style={style}> 
            <AnimatePresence>
            {
                !out && 
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        onClick={handleFlameClick} className="candle-flames mx-auto"
                    ></motion.div>
                } 
            </AnimatePresence>
            { out && <div    
                onClick={handleFlameClick} className='candle-flames-replace mx-auto'
            ></div> }
            <div onClick={handleFlameClick} className="candle-stick absolute left-[47%] bottom-[57%]"></div> 
            <div onClick={handleBodyClick} className="candle-body rounded-md absolute mx-[13px] bottom-0"></div> 
        </div>
    );
};

export default Candle;
