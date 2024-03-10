import { useState, useEffect } from "react";

import Chat from "./components/Chat";
import PetCanvas from "./components/PetCanvas";
import Calendar from "./components/Calendar";
import DatePicker from "react-datepicker";

function App() {
  const [username, setUsername] = useState("");
  const [petname, setPetname] = useState("");
  const [programName, setProgramName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCreatePetForm, setShowCreatePetForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedUsername = localStorage.getItem("username");
    return !!storedUsername;
  });
  const [showChatbot, setShowChatbot] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    setIsLoggedIn(true);
  };

  const createPet = (e) => {
    e.preventDefault();
    localStorage.setItem("petname", petname);
    localStorage.setItem("selectedImage", selectedImage);
    setShowCreatePetForm(false);
    localStorage.setItem("program", programName);
    localStorage.setItem("graduation", selectedDate);
  };

  const toggleCreatePetForm = () => {
    setShowCreatePetForm((prev) => !prev);
  };

  useEffect(() => {
    const storedImage = localStorage.getItem("selectedImage");
    setSelectedImage(storedImage || "/dog.svg");

    const storedPetName = localStorage.getItem("petname");
    setPetname(storedPetName);

    const storedUserName = localStorage.getItem("username");
    setUsername(storedUserName);

  }, []);

  
  return (
    <div className="max-w-[1200px] min-w-[400px] h-screen mx-auto px-12 py-10">
      <div className="">
        <h1></h1>
        {isLoggedIn ? (
          <div className="w-full h-screen flex flex-col gap-6">
            <div className="card py-6 px-14 flex justify-between items-center font-bold text-3xl">
              <p>Welcome, {localStorage.getItem("username")}!</p>
              {!localStorage.getItem("petname") && (
                <button onClick={toggleCreatePetForm} className="btn text-base font-normal py-2 px-4 ">
                  {showCreatePetForm ? "Cancel" : "Create Pet"}
                </button>
              )}
            </div>
            {showCreatePetForm && !localStorage.getItem("petname") && (
              <div className="card h-2/3 px-10 flex flex-col justify-center items-center">
                <form onSubmit={createPet} className="flex flex-col space-y-4">
                  <div className="mb-4">
                    <label>Pet Name</label>
                    <input
                      type="text"
                      placeholder="Enter your pet's name"
                      value={petname}
                      onChange={(e) => setPetname(e.target.value)}
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="image"
                      className="-text--primary"
                    >
                      Select the initial image for your pet:
                    </label>
                    <select
                      id="image"
                      value={selectedImage}
                      onChange={(e) => setSelectedImage(e.target.value)}
                      className="input"
                      required
                    >
                      <option value="/dog.svg">Dog</option>
                      <option value="/sleepy-cat.jpg">Sleepy Cat</option>
                      <option value="/hungry-cat.png">Hungry Cat</option>
                    </select>
                  </div>
                  <button type="submit" className="btn">
                    Confirm
                  </button>
                </form>
              </div>
            )}
            {localStorage.getItem("petname") && selectedImage && (
              <div className="card h-2/3 px-10 flex flex-col justify-center items-center">
                <PetCanvas initialImage={selectedImage} />
              </div>
            )}
            {showChatbot && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                <div className="relative bg-white p-6 rounded shadow-lg max-w-md w-full">
                  <button
                    onClick={toggleChatbot}
                    className="absolute top-0 right-0 mt-4 mr-4 bg-transparent text-gray-700 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    title="Close"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                  <Chat petname={petname} username={username}/>
                </div>
              </div>
            )}
            <div className="flex w-full justify-between">
              <Calendar />
              <button
              onClick={toggleChatbot}
              className="action-button -bg--ternary w-20 h-20 ml-4"
              >
                <img src="public/romance-love-letter-open.png" className='w-20' alt="chat-img"/>
              Chat
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full md:w-3/4 mx-auto">
            <form
              onSubmit={handleLogin}
              className="flex flex-col space-y-8 mt-10"
            >
              <div className="flex flex-col">
                <label>Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input mt-2"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label>Your Program Name</label>
                <input
                  type="text"
                  placeholder="Enter your program name"
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                  className="input mt-2"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label>Expected Graduation</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  customInput={<input className="input w-full mt-2" />}
                />
              </div>
              <div className="flex flex-col">
                <p className="mb-2">Your schedule</p>
                <Calendar />
              </div>
              <button type="submit" className="btn">
                Create Pet
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
