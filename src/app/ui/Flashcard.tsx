import React, { useState } from "react";
import { motion } from "framer-motion";

interface FlashcardProps {
  question: string;
  answer: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleFlip() {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  }

  return (
    <div
      className="flip-card rounded-3xl w-[300px] h-[400px] hover:opacity-95 cursor-pointer m-10"
      onClick={handleFlip}
    >
      <motion.div
        className="flip-card-inner relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        <div
          className="flip-card-front shadow-lg shadow-black  absolute w-full h-full bg-flashcard-bg bg-cover bg-center flex flex-col rounded-3xl"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <h1 className="font-breul text-xl bg-gradient-to-r my-5 from-slate-500 to-slate-900 bg-clip-text text-transparent mx-10">
            Flashio
          </h1>
          <div className="flex flex-col items-center h-full my-20">
            <h1 className="font-barlow mx-10 text-center bg-gradient-to-r from-slate-500 to-slate-900 bg-clip-text text-transparent opacity-80 font-bold text-3xl">
              Q
            </h1>
            <h1 className="font-barlow mx-10 text-center bg-gradient-to-r from-slate-500 to-slate-900 bg-clip-text text-transparent opacity-80 font-bold text-3xl">
              {question}
            </h1>
          </div>
        </div>

        <div
          className="flip-card-back shadow-lg shadow-black  absolute w-full h-full bg-flashcard-bg bg-cover bg-center flex flex-col rounded-3xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h1 className="font-breul text-xl bg-gradient-to-r my-5 from-slate-500 to-slate-900 bg-clip-text text-transparent mx-10">
            Flashio
          </h1>
          <div className="flex flex-col items-center h-full my-20">
            <h1 className="font-barlow mx-10 text-center bg-gradient-to-r from-slate-500 to-slate-900 bg-clip-text text-transparent opacity-80 font-bold text-3xl">
              A
            </h1>
            <h1 className="font-barlow mx-10 text-center bg-gradient-to-r from-slate-500 to-slate-900 bg-clip-text text-transparent opacity-80 font-bold text-3xl">
              {answer}
            </h1>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Flashcard;
