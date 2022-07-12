import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const Finished = () => {

  const [error, setError] = useState(false)

  useEffect(() => {
    const getFile = async () => {
      // get request to server
      const url = 'http://127.0.0.1:3333/api/download-result'
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/zip'},
      };
      fetch(url, requestOptions).then((response) => response.blob())
        .then((blob) => {
          console.log("the blob is ", blob);
          // Create blob link to download
          const url = window.URL.createObjectURL(
            new Blob([blob]),
          );
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute(
            'download',
            `download.zip`,
          );

          // Append to html link element page
          document.body.appendChild(link);

          // Start download
          link.click();

          // Clean up and remove the link
          link.parentNode.removeChild(link);
        });

      // let data = await response.json()
      // if (data.data === null) {
      //   setError(true)
      // }
    }
    getFile()
  }, []);


  return (
    <div>

      <div className="bg-white dark:bg-gray-800 ">
        <div
          className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
          <h2
            className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
            <span className="block">
                Download completed
            </span>
            <span
              className="block text-indigo-500">
                Thank you for using our service
            </span>
          </h2>
          <div
            className="lg:mt-0 lg:flex-shrink-0">
            <div
              className="mt-12 inline-flex rounded-md shadow">
              <Link to={"/"}
                    className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                Download a new tutorial
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className={"bg-red-100 mt-3 border border-red-400 text-red-700 px-4 py-3 rounded relative " + (error ? "" : "hidden")}
        role="alert">
          <span
            className="block sm:inline">You don't have any file on this app</span>
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
  )
}

export default Finished
