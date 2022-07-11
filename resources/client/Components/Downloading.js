import io from 'socket.io-client'
import {useEffect, useState} from "react";

const Downloading = () => {

  const socket = io.connect();

  const [progression, setProgression] = useState(0)
  const [total, setTotal] = useState(0)
  const [downloadIndex, setIndex] = useState(0)

  useEffect(() => {

    socket.emit("download:ready", () => {
      console.log("the socket id is ", socket.id);
    });

    socket.on("download:status", (data) => {
      console.log("data received ", data.data.state);
      setProgression(Math.round(data.data.state))
    });

  }, []);


  return (
    <div
      className="m-auto space-y-8 md:w-8/12 lg:">
      <div
        className="rounded-xl border bg-opacity-50 backdrop-blur-2xl bg-white shadow-xl">

        <div
          className="flex justify-center items-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status">
            <span
              className="visually-hidden">Loading...</span>
          </div>
        </div>

        <div
          className="w-full bg-gray-200 rounded-full">
          <div
            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
            style={{width: progression + 'px'}}> {progression}%
          </div>
        </div>

      </div>
    </div>
  )
}

export default Downloading
