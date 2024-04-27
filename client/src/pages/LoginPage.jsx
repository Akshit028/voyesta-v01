import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";
import signup from "../assets/signup.png";
import SweetAlert from 'react-bootstrap-sweetalert';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [alert, setAlert] = useState(null);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    // Perform client-side validation
    if (!email || !password) {
      setAlert({ title: 'Please fill in both email and password', type: 'error' });
      return;
    }
    try {
      const { data } = await axios.post('/login', { email, password });
      setUser(data);
      setAlert({ title: 'Login Successful', type: 'success' });
    } catch (e) {
      setAlert({ title: 'Invalid login details, Please Check if you have signed up before logging in', type: 'error' });
    }
  }

  const handleAlertConfirm = () => {
    setAlert(null);
    setRedirect(true); // Redirect after the user confirms the alert
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <section>
      {alert && (
        <SweetAlert
          title={alert.title}
          type={alert.type}
          onConfirm={handleAlertConfirm}
        />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-[#302F87] sm:text-4xl">Sign in</h2>
            <p className="mt-2 text-base text-gray-600">
              Don&apos;t have an account?
              <Link className="underline text-[#302F87]" to={'/register'}> Sign up</Link>
            </p>
            <form onSubmit={handleLoginSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="text-base font-medium text-gray-900"> Email address </label>
                  <div className="mt-2">
                    <input className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" required type="email" placeholder="Email" value={email}
                      onChange={ev => setEmail(ev.target.value)} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-base font-medium text-gray-900"> Password </label>
                  </div>
                  <div className="mt-2">
                    <input className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" required type="password" placeholder="Password" value={password}
                      onChange={ev => setPassword(ev.target.value)} />
                  </div>
                </div>
                <div>
                  <button type="submit" className="inline-flex w-full items-center justify-center rounded-md bg-[#302F87] px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-[#302F87]/80">Log in</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="h-full w-full">
          <img className="mx-auto  h-full w-full rounded-md object-cover" src={signup} alt="sign up" />
        </div>
      </div>
    </section>
  );
}
