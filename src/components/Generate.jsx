"use client";

import { useContext, useEffect, useState } from "react";
import { instructions } from "../utils/content";
import { BrainCog, Sparkles } from "lucide-react";
import Modal from "./Modal/Modal";
import FileNameModal from "./Modal/FileNameModal";
import { notesLinkContext } from "./Context/NotesLinkProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { fileLinkContext } from "./Context/FileLinkProvider";
import TopicNameModal from "./Modal/TopicNameModal";
import axiosInstance from "../utils/axiosInstance";

const Genearate = () => {
  const [loading, setloading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [fileNameModal, setFileNameModal] = useState(false);
  const [TopicModal, setTopicModal] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);
  const [generatingError, setGeneratingError] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const { notesLink } = useContext(notesLinkContext);
  const { fileLink } = useContext(fileLinkContext);

  const navigate = useNavigate();

  function handleGenerateNotes() {
    setGeneratingError(false);
    setConfirmationModal(true);
  }

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axiosInstance.get("/api/auth/session");

        const { user } = response.data;
        console.log(user);
        localStorage.setItem("userId", user.id);
        setSessionToken(user);
        setProfilePicture(user.picture);

        if (!response.data.user) {
          navigate("/");
        }
      } catch (error) {
        console.log("Session check failed:", error);
        navigate("/");
      }
    };

    checkSession();
  }, []);

  // if (!userId) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-[#0a0a0f]">
  //       <div className="relative w-24 h-24">
  //         <div className="absolute inset-0 border-t-4 border-purple-500 rounded-full animate-spin"></div>
  //         <div className="absolute inset-4 border-t-4 border-purple-500 rounded-full animate-spin"></div>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="w-[480px] h-[610px] ">
          <div className=" flex items-center justify-between space-x-1 mt-4 mx-4">
            <div className="flex gap-2">
              <BrainCog className="w-6 h-6 text-purple-400" />
              <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-400">
                How It Works
              </span>
            </div>

            <div>
              <button
                className="text-white"
                onClick={() => navigate("/profile")}
              >
                <img
                  src={profilePicture}
                  alt="pfp"
                  className="w-10 h-10 rounded-full "
                />
              </button>
            </div>
          </div>

          <p className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-400 flex items-center justify-center mt-12">
            Generate Notes in Seconds
          </p>

          <div className="flex justify-center mt-4 w-full px-4">
            <div className="w-full pr-2">
              <button
                className="flex gap-2 items-center justify-center bg-gradient-to-r from-purple-500 to-violet-800  font-bold w-full rounded-lg h-12"
                onClick={() => handleGenerateNotes()}
              >
                <Sparkles />
                {loading ? (
                  <span className="text-lg">Generating...</span>
                ) : (
                  <span className="text-lg">Generate Notes</span>
                )}
              </button>
            </div>
          </div>
          {confirmationModal && (
            <Modal
              showModal={confirmationModal}
              setShowModal={setConfirmationModal}
              setFileNameModal={setFileNameModal}
              setTopicModal={setTopicModal}
            />
          )}

          {fileNameModal && (
            <FileNameModal
              onCancel={() => setFileNameModal(false)}
              setLoading={setloading}
              setFileNameModal={setFileNameModal}
              setConfirmationModal={setConfirmationModal}
              setGeneratingError={setGeneratingError}
            />
          )}
          {TopicModal && (
            <TopicNameModal
              onCancel={() => setTopicModal(false)}
              setLoading={setloading}
              setTopicModal={setTopicModal}
              setConfirmationModal={setConfirmationModal}
              setGeneratingError={setGeneratingError}
            />
          )}
          {!notesLink ? (
            <div className="mt-4">
              <p className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-400 text-center">
                {" "}
              </p>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-400 text-center mb-2">
                Here are your Notes
              </p>
              <div className="text-center px-2 mx-4 border-[#321c43] rounded-lg bg-[#1a1a1a] hover:underline underline-offset-1">
                <Link
                  to={notesLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  {notesLink}
                </Link>
              </div>
            </div>
          )}

          {!fileLink ? (
            ""
          ) : (
            <div className="mt-4">
              <p className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-400 text-center mb-2">
                Here are your Notes
              </p>
              <div className="text-center px-2 mx-4 border-[#321c43] rounded-lg bg-[#1a1a1a] hover:underline underline-offset-1 py-2">
                <Link
                  to={fileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  {fileLink}
                </Link>
              </div>
            </div>
          )}

          {generatingError && !fileLink && !notesLink && (
            <div>
              <p className="text-lg font-semibold bg-clip-text text-transparent text-white text-center mb-2">
                Error occured while generating notes :/
              </p>
            </div>
          )}

          <p className="text-center mt-4 px-4 text-zinc-300 text-sm">
            Follow these simple steps to transform any webpage into
            well-structured notes
          </p>
          {/* INSTRUCTIONS DIV */}

          <div className="p-1 mt-4">
            {instructions.map((instruction, index) => (
              <div
                key={index}
                className="border-[#321c43] border rounded-lg mb-2 mx-4 flex h-24"
              >
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center ml-5 mt-3 text-purple-400">
                  {instruction.icon}
                </div>
                <div className="mt-3 flex flex-col ml-10 items-start">
                  <div className="font-semibold text-base text-gray-300">
                    {instruction.title}
                  </div>
                  <div className="text-sm text-zinc-400">
                    {instruction.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Genearate;
