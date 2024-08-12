"use client";
import React, { useState, useEffect, useId } from "react";
import { Plus, Trash2 } from "lucide-react";
interface FlashcardData {
  id: number;
  question: string;
  answer: string;
}
export default function page() {
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const id = useId();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/flashcards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: formData.question,
        answer: formData.answer,
      }),
    });
    const data = await res.json();
    setFlashcards((prev) => [...prev, data]);
    setFormData({
      question: "",
      answer: "",
    });
    closeModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  return (
    <main className="h-screen  flex flex-col  bg-gradient-to-b from-slate-300 to-slate-700">
      <div className="md:flex justify-between m-10">
        <h1 className="font-breul text-5xl mb-4 md:mb-0 md:text-7xl bg-gradient-to-r from-slate-500 to-slate-900 bg-clip-text text-transparent">
          WELCOME
        </h1>
        <button
          className="rounded-lg bg-green-600 flex justify-center items-center px-6 shadow-md shadow-black py-2 text-lg font-breul hover:opacity-90"
          onClick={openModal}
        >
          <Plus size={28} />
          ADD
        </button>
      </div>
      <h1 className="font-breul m-10 text-5xl bg-gradient-to-r from-slate-500 to-slate-900 bg-clip-text text-transparent my-10">
        Your Flashcards
      </h1>
      <div className="flex flex-col md:grid grid-cols-3 gap-4 m-10">
        {flashcards.map((flashcard) => (
          <div className="flex flex-col md:flex-row justify-between bg-flashcard-bg text-black bg-cover  p-5 rounded-lg shadow-lg shadow-black">
            <div key={flashcard.id}>
              <h1 className="font-barlow text-2xl">{flashcard.question}</h1>
              <p>{flashcard.answer}</p>
            </div>
            <Trash2
              size={28}
              className="cursor-pointer mt-2"
              color="#ff0000"
              onClick={async () => {
                await fetch(`/api/flashcards/${flashcard.id}`, {
                  method: "DELETE",
                });
                setFlashcards((prev) =>
                  prev.filter((f) => f.id !== flashcard.id)
                );
              }}
            />
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-10 rounded-lg">
            <h1 className="font-breul text-3xl">Add Flashcard</h1>
            <form className="flex flex-col ">
              <input
                type="text"
                placeholder="Question"
                className="p-2 mb-2 rounded-lg border-gray-500 border-2 text-black"
                value={formData.question}
                name="question"
                onChange={handleChange}
                id={id + "-question"}
              />
              <input
                type="text"
                placeholder="Answer"
                className="p-2 mb-5 rounded-lg border-gray-500 border-2 text-black"
                value={formData.answer}
                name="answer"
                onChange={handleChange}
                id={id + "-answer"}
              />
              <button
                type="submit"
                className="bg-green-600 text-white p-2 rounded-lg mb-5"
                onClick={handleSubmit}
              >
                Add
              </button>
            </form>
            <button
              className="bg-red-600 text-white p-2 rounded-lg"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
