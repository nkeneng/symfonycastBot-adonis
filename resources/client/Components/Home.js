import {
  useNavigate,
} from 'react-router-dom';
import {useState} from "react";

const Home = () => {

  const [email, setEmail] = useState('')
  const handleEmailChange = event => {
    setEmail(event.target.value)
  };
  const [password, setPassword] = useState('')
  const handlePasswordChange = event => {
    setPassword(event.target.value)
  };
  const [links, setLinks] = useState('')
  const handleLinksChange = event => {
    setLinks(event.target.value)
  };

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault();

    const url = 'http://127.0.0.1:3333/api/start-downloading'
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email,
        password,
        links
      })
    };
    console.log(requestOptions);
    await fetch(url, requestOptions)
    navigate('/downloading')
  }

  return (
    <div>
      <div
        className="m-auto space-y-8 md:w-8/12 lg:">
        <div
          className="rounded-xl border bg-opacity-50 backdrop-blur-2xl bg-white shadow-xl">

          <div className="p-6 sm:p-16">
            <h2
              className="mb-8 text-2xl text-cyan-900 font-bold">
              Enter your informations</h2>
            <form onSubmit={onSubmit}
                  className="space-y-8">
              <div className="space-y-2">
                <label htmlFor="email"
                       className="text-gray-700">Email</label>
                <input type="email" name="email"
                       id="email"
                       onChange={handleEmailChange}
                       value={email}
                       className="block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300
    focus:ring-2 focus:ring-sky-300 focus:outline-none
    invalid:ring-2 invalid:ring-red-400"
                />
              </div>

              <div>
                <div
                  className="flex items-center justify-between">
                  <label htmlFor="password"
                         className="text-gray-700">Password</label>

                </div>
                <input type="password"
                       name="password"
                       id="password"
                       onChange={handlePasswordChange}
                       value={password}
                       className="block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300
                                        focus:ring-2 focus:ring-sky-300 focus:outline-none
                                        invalid:ring-2 invalid:ring-red-400"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="links"
                       className="text-gray-700">links</label>
                <input type="text" name="links"
                       id="links"
                       onChange={handleLinksChange}
                       value={links}
                       className="block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300
    focus:ring-2 focus:ring-sky-300 focus:outline-none
    invalid:ring-2 invalid:ring-red-400"
                />
              </div>

              <button type="submit"
                      className="w-full py-3 px-6 rounded-md bg-indigo-200
                                    focus:bg-sky-700 active:bg-indigo-200">
                <span
                  className="text-black">Continue</span>
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home
