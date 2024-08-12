"use client";
import { useState, useEffect } from "react";
import Flashcard from "./ui/Flashcard";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import Link from "next/link";
interface FlashcardData {
  id: number;
  question: string;
  answer: string;
}

export default function Page() {
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  useEffect(() => {
    const fetchFlashCards = async () => {
      try {
        const res = await fetch("/api/flashcards");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: FlashcardData[] = await res.json();
        setFlashcards(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchFlashCards();
  }, []);

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex(
      (prev) => (prev - 1 + flashcards.length) % flashcards.length
    );
  };

  return (
    <main className=" h-screen bg-gradient-to-b from-slate-300 to-slate-700">
      <nav className="h-[15%] flex flex-col mx-10 mb-20 md:mb-0">
        <div className="md:flex justify-between m-14 items-center">
          <h1 className="font-breul text-6xl bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent cursor-pointer">
            Flashio
          </h1>
          <div className="flex flex-col md:flex-row items-center md:justify-between mt-5 md:my-0">
            <Link href="/dashboard">
              <button className="px-5 py-2 my-2 md:my-0 font-breul text-2xl bg-gradient-to-r from-slate-500 to-slate-900 rounded-xl ">
                Log In
              </button>
            </Link>
            <button className="px-5 py-2 my-2 md:my-0 font-breul text-2xl bg-gradient-to-r from-slate-500 to-slate-900 bg-clip-text text-transparent">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      <div className="h-[75%] flex flex-col justify-center items-center">
        {error ? (
          <p>Error: {error}</p>
        ) : flashcards.length > 0 ? (
          <>
            <Flashcard
              key={flashcards[currentCardIndex].id}
              question={flashcards[currentCardIndex].question}
              answer={flashcards[currentCardIndex].answer}
            />
            <div className="flex ">
              <CircleChevronLeft
                size={64}
                onClick={handlePrevCard}
                className="cursor-pointer mx-5"
                color="#000"
              />
              <CircleChevronRight
                size={64}
                onClick={handleNextCard}
                className="cursor-pointer mx-5"
                color="#000"
              />
            </div>
          </>
        ) : (
          <p>No flashcards available</p>
        )}
      </div>
    </main>
  );
}
