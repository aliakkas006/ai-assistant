"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

interface Professional {
  _id: string;
  name: string;
  category: string;
  rating: number;
}

export default function VoiceTextInput() {
  const [query, setQuery] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [results, setResults] = useState<Professional[]>([]);

  const startRecording = () => {
    setIsRecording(true);

    // Fix for TypeScript SpeechRecognition error
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      setIsRecording(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsRecording(false);
    };

    recognition.start();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const searchProfessionals = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data: Professional[] = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching professionals:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center border border-gray-300 rounded-full p-2 shadow-sm bg-gray-100">
        <button
          onClick={startRecording}
          className="w-10 h-10 flex items-center justify-center bg-white rounded-full mr-2 border border-gray-300"
        >
          <FontAwesomeIcon icon={faMicrophone} />
        </button>
        <input
          type="text"
          placeholder="Type Message"
          value={query}
          onChange={handleInputChange}
          className="flex-1 bg-transparent outline-none text-gray-700 px-2"
        />
        <button
          onClick={searchProfessionals}
          className="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-gray-300"
        >
          ➤
        </button>
      </div>

      {/* Display Results */}
      {/* <div className="mt-4">
        {results.length > 0 ? (
          <ul className="bg-white shadow-md rounded-md p-4">
            {results.map((prof) => (
              <li key={prof._id} className="border-b p-2 last:border-none">
                <strong>{prof.name}</strong> ({prof.category}) - ⭐{prof.rating}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No results found.</p>
        )}
      </div> */}
    </div>
  );
}
