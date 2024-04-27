import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import signup from "../assets/signup.png";
import SweetAlert from 'react-bootstrap-sweetalert';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);

  async function registerUser(ev) {
    ev.preventDefault();
    // Perform client-side validation
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });
      setAlert({ title: 'Registration Successful, Now you can log in', type: 'success' });
      // Reset form fields after successful registration
      setName('');
      setEmail('');
      setPassword('');
    } catch (e) {
      setAlert({ title: 'Registration Failed, Please Try Again Later', type: 'error' });
    }
  }

  const handleAlertConfirm = () => {
    setAlert(null);
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
            <h2 className="text-3xl font-bold leading-tight text-[#302F87] sm:text-4xl">Sign up</h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?
              <Link className="underline text-[#302F87]" to={'/login'}> Sign in</Link>
            </p>
            <form onSubmit={registerUser} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900"> Full Name </label>
                  <div className="mt-2">
                    <input required className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" type="text" placeholder="Full Name" id="name" value={name}
                      onChange={ev => setName(ev.target.value)} />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-base font-medium text-gray-900"> Email address </label>
                  <div className="mt-2">
                    <input required className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" type="email" placeholder="Email" id="email" value={email}
                      onChange={ev => setEmail(ev.target.value)} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-base font-medium text-gray-900"> Password </label>
                  </div>
                  <div className="mt-2">
                    <input required className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" type="password" placeholder="Password" id="password" value={password}
                      onChange={ev => setPassword(ev.target.value)} />
                  </div>
                </div>
                <div>
                  <button type="submit" className="inline-flex w-full items-center justify-center rounded-md bg-[#302F87] px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-[#302F87]/80">Create Account</button>
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
