import React, { useState } from "react";
import { Upload } from "lucide-react"; // for the upload icon
import { ArrowLeft } from "lucide-react"; 
import { Outlet, useLocation, useNavigate, Routes, Route, Link } from "react-router-dom";

const MentorRequestForm = () => {
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-['Public Sans']">
      <div className="bg-orange-100 w-full max-w-md rounded-2xl shadow-md p-6 md:p-8">
        {/* Title */}
        <div className="text-center mb-6">
            <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
      >
        <ArrowLeft size={30} />
      </button>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Send request to mentor
          </h2>
          <hr className="border-t border-gray-300 mt-3" />
        </div>

        {/* Send Request Section */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Send request
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            If it is your first meeting then please send request directly to
            mentor.
          </p>
          <button className="w-full bg-orange-400 text-white font-semibold py-2.5 rounded-md hover:bg-orange-500 transition-all">
            Send request
          </button>
        </div>

        {/* Upload Feedback Section */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Upload feedback
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Kindly upload the interview feedback form from your email which you
            received at your first meet.
          </p>

          <div className="flex flex-col items-center justify-center border-2 border-dashed border-orange-300 rounded-lg p-6 mb-3 bg-orange-50">
            <Upload className="text-orange-400 w-8 h-8 mb-2" />
            <p className="text-sm text-gray-700 font-semibold mb-2">
              Upload file
            </p>

            <label className="cursor-pointer bg-orange-400 text-white text-sm px-5 py-2 rounded-md hover:bg-orange-500 transition-all">
              Browse
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {fileName && (
              <p className="text-xs text-gray-500 mt-2">{fileName}</p>
            )}
          </div>

          <p className="text-xs text-center text-gray-500">
            Supported: pdf, docs
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="border-2 border-orange-400 text-orange-500 font-semibold py-2 px-8 rounded-md hover:bg-orange-50 transition-all"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-orange-400 text-white font-semibold py-2 px-8 rounded-md hover:bg-orange-500 transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorRequestForm;
