import io from 'socket.io-client'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Downloading = () => {

  const socket = io.connect();

  const navigate = useNavigate()

  const [progression, setProgression] = useState(0)
  const [message, setMessage] = useState("")
  const [error, setError] = useState(false)


  useEffect(() => {

    socket.emit("download:ready", () => {
      console.log("the socket id is ", socket.id);
    });

    socket.on("download:status", (data) => {
      if (data.message !== "" && !data.finished) {
        setMessage(data.message)
        setError(true)
      }
      setProgression(Math.round(data.state))
      if (data.finished) {
        navigate('/finished')
      }
    });

  }, []);


  return (
    <div className="bg-white dark:bg-gray-800 ">
      <div
        className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">

        <h2
          className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
            <span className="block">
                {progression}%
            Completed
            </span>
          <span
            className="block text-indigo-500">
               Please
            wait while your download is processed
            </span>
        </h2>

        <div
          className="lg:mt-0 lg:flex-shrink-0 mb-3">
          <div
            className="mt-12 w-full inline-flex rounded-md shadow">
            <div
              className="bg-indigo-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none"
              style={{width: progression + '%'}}> {progression}%
            </div>
          </div>
        </div>

        <div
          className={"bg-red-100 mt-3 border border-red-400 text-red-700 px-4 py-3 rounded relative " + (error ? "" : "hidden")}
          role="alert">
          <span
            className="block sm:inline">{message}</span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"><title>Close</title><path
                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>

      </div>
    </div>
  )
}

export default Downloading
