import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  const [error, setError] = useState('');
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberofNights = 0;
  if (checkIn && checkOut) {
    numberofNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function reserve() {
    if (!checkIn || !checkOut || !guests || !name || !phone) {
      setError('Please fill in all fields.');
      return;
    }

    const response = await axios.post('/bookings', {
      checkIn,checkOut,guests,name,phone,
      place:place._id,
      price:numberofNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to = {redirect} />
  }

  return (
    <div className=" bg-white shadow p-2 rounded-2xl">
      <div className="text-2xl text-center">
        Price : ₹{place.price}
        <span className=" text-100px font-thin"> night</span>
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex text-xs ">
          <div className="py-3 px-4">
            <label>Check in:</label>
            <input
              required
              type="date"
              value={checkIn}
              onChange={(ev) => { setCheckIn(ev.target.value); setError(''); }}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out:</label>
            <input
              required
              type="date"
              value={checkOut}
              onChange={(ev) => { setCheckOut(ev.target.value); setError(''); }}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Guests</label>
          <input
            required
            type="number"
            value={guests}
            onChange={(ev) => { setGuests(ev.target.value); setError(''); }}
          />
        </div>
        {numberofNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Full Name:</label>
            <input
              required
              type="text"
              value={name}
              onChange={(ev) => { setName(ev.target.value); setError(''); }}
            />
            <label>Phone Number:</label>
            <input
              required
              type="tel"
              value={phone}
              onChange={(ev) => { setPhone(ev.target.value); setError(''); }}
            />
          </div>
        )}
        {error && (
          <div className="text-red-600 p-2">{error}</div>
        )}
      </div>
      <button onClick={reserve} className="primary w-full mt-4">
        Reserve
        {numberofNights > 0 && (
          <span> for ₹{numberofNights * place.price}</span>
        )}
      </button>
    </div>
  );
}
