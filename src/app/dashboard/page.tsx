"use client";
import React, { useState, useEffect, useId } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
interface FlashcardData {
  id: number;
  question: string;
  answer: string;
}
export default function page() {
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flashcardToEdit, setFlashcardToEdit] = useState<FlashcardData | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });
  const openModal = () => {
    setIsModalOpen(true);
  };

  const openEditModal = (flashcard: FlashcardData) => {
    setIsEditModalOpen(true);
    setFlashcardToEdit(flashcard);
    setFormData({
      question: flashcard.question,
      answer: flashcard.answer,
    });
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const id = useId();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (flashcardToEdit) {
        e.preventDefault();
      const res = await fetch(`/api/flashcards/${flashcardToEdit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: formData.question,
          answer: formData.answer,
        }),
      });
      const data = await res.json();
      setFlashcards((prev) =>
        prev.map((f) => (f.id === flashcardToEdit.id ? data : f))
      );
      setFlashcardToEdit(null);
    } else {
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
    }
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
    <main className=" min-h-screen flex flex-col bg-cover  bg-gradient-to-b from-slate-300 to-slate-700">
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
          <div className="flex flex-col  md:flex-row justify-between bg-flashcard-bg text-black bg-cover  px-10 py-8 mr-5 mb-5 rounded-lg shadow-lg shadow-black" key={flashcard.id}>
            <div >
              <h1 className="font-barlow text-2xl">{flashcard.question}</h1>
              <p>{flashcard.answer}</p>
            </div>
            <div className="flex flex-col">
              <Trash2
                size={28}
                className="cursor-pointer my-2"
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
              <Pencil
                size={28}
                className="cursor-pointer mt-2"
                color="#0000ff"
                onClick={() => openEditModal(flashcard)}
              />
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-10 rounded-lg">
            <h1 className="font-breul text-3xl">Add Flashcard</h1>
            <form className="flex flex-col " onSubmit={handleSubmit}>
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

      {isEditModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-10 rounded-lg">
            <h1 className="font-breul text-3xl">Edit Flashcard</h1>
            <form className="flex flex-col " onSubmit={handleSubmit}>
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
              >
                Edit
              </button>
            </form>
            <button
              className="bg-red-600 text-white p-2 rounded-lg"
              onClick={closeEditModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
