import { motion } from "framer-motion";
import { useRegisterModalStore } from "@/store/useRegisterModalStrore";
import { useState } from "react";
import { validateRssUrl, validateName, validateEmail, validateBlogger } from "./rssValidation";

export default function RssRegistrationModal({ onClose }: { onClose: () => void }) {
  const { rssUrl, bloggerName, userName, email, setRssUrl, setBloggerName, setUserName, setEmail, resetInputs } =
    useRegisterModalStore();
  const [rssUrlValid, setRssUrlValid] = useState<boolean>(true);
  const [bloggerNameValid, setBloggerNameValid] = useState<boolean>(true);
  const [userNameValid, setUserNameValid] = useState<boolean>(true);
  const [emailValid, setEmailValid] = useState<boolean>(true);

  const handleRssUrlChange = (e) => {
    const value = e.target.value;
    setRssUrl(value);
    console.log(validateRssUrl(value));
    setRssUrlValid(validateRssUrl(value) === true);
  };

  const handleBloggerNameChange = (e) => {
    const value = e.target.value;
    setBloggerName(value);
    setBloggerNameValid(validateBlogger(value) === true);
  };

  const handleUserNameChange = (e) => {
    const value = e.target.value;
    setUserName(value);
    setUserNameValid(validateName(value) === true);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(validateEmail(value) === true);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col space-y-4">
          <label className="flex flex-col">
            <span>RSS URL</span>
            <input
              type="text"
              value={rssUrl}
              onChange={handleRssUrlChange}
              className={`border rounded p-2 mt-1 ${rssUrlValid ? "border-gray-300" : "border-red-500 bg-red-100"}`}
            />
          </label>

          <label className="flex flex-col">
            <span>블로그 명</span>
            <input
              type="text"
              value={bloggerName}
              onChange={handleBloggerNameChange}
              className={`border rounded p-2 mt-1 ${bloggerNameValid ? "border-gray-300" : "border-red-500 bg-red-100"}`}
            />
          </label>

          <label className="flex flex-col">
            <span>신청자 이름</span>
            <input
              type="text"
              value={userName}
              onChange={handleUserNameChange}
              className={`border rounded p-2 mt-1 ${userNameValid ? "border-gray-300" : "border-red-500 bg-red-100"}`}
            />
          </label>

          <label className="flex flex-col">
            <span>이메일</span>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              className={`border rounded p-2 mt-1 ${emailValid ? "border-gray-300" : "border-red-500 bg-red-100"}`}
            />
          </label>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => {
              resetInputs();
              onClose();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            닫기
          </button>
          <button
            onClick={() => {
              resetInputs();
              console.log(rssUrl, bloggerName, userName, email);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            등록
          </button>
        </div>
      </div>
    </motion.div>
  );
}
