"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import axios, { AxiosError } from "axios";

type Professional = {
  id: string;
  type: string;
  orgOrPracId: string;
  usernameOrBusinessUrl: string;
  name: string;
  ranking: number;
  photo: string;
  category: string;
  subCategory: string[];
  rating: number;
  totalAppointments: number;
  zone: string[];
  branch: string[];
  areaOfPractice: string;
};

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

export default function VoiceTextInput() {
  const [query, setQuery] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [results, setResults] = useState<Professional[]>([]);

  /**
   * Starts voice recording and sets the query based on the transcribed text.
   */
  const startRecording = () => {
    setIsRecording(true);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      setIsRecording(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsRecording(false);
    }

    // recognition.onresult = <T>(event) => {
    //   const transcript = event.results[0][0].transcript;
    //   setQuery(transcript);
    //   setIsRecording(false);
    // };

    recognition.start();
  };

  /**
   * Handles changes in the text input field.
   * @param e - The change event from the input field.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  /**
   * Searches for professionals based on the query.
   */
  const searchProfessionals = async () => {
    try {
      const res = await axios.post<Professional[]>("http://localhost:3000/search", {
        query: "Find me the best doctor in Uttara Dhaka",
      });

      setResults(res.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Axios error fetching professionals:", error.message);
      } else {
        console.error("Unexpected error fetching professionals:", error);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Voice and Text Input */}
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
      <div className="mt-4">
        {results.length > 0 ? (
          <ul className="bg-white shadow-md rounded-md p-4">
            {results.map((prof) => (
              <li key={prof.id} className="border-b p-2 last:border-none">
                <strong>{prof.name}</strong> ({prof.category}) - ⭐{prof.rating}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No results found.</p>
        )}
      </div>
    </div>
  );
}

