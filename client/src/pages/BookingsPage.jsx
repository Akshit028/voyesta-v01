import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import BookingDates from "../BookingDates";
import { Link } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import Swal from 'sweetalert2';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [cancelBookingId, setCancelBookingId] = useState(null);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data);
      setLoading(false);
    });
  }, [cancelBookingId]);

  const cancelBooking = async (bookingId) => {
    // Display confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to cancel this booking!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/bookings/${bookingId}`);
        Swal.fire('Cancelled!', 'Your reservation has been cancelled.', 'success').then(() => {
          // Redirect to home page after clicking OK on the Swal dialog
          window.location.href = '/'; // Redirect to the home page
        });


        // Remove the canceled booking from the state
        setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));

      } catch (error) {
        setAlert({ title: 'Failed to Cancel Booking', type: 'error' });
      }
    }
  };

  const handleAlertConfirm = () => {
    setAlert(null);
  };

  return (
    <div>
      <div>
        {alert && (
          <SweetAlert
            title={alert.title}
            type={alert.type}
            onConfirm={handleAlertConfirm}
          />
        )}
      </div>
      <div className="mx-auto mt-8 w-full min-h-screen">
        <AccountNav />
        {loading && <p>Loading...</p>}
        {!loading && bookings?.length === 0 && <p className="text-2xl text-center font-bold text-primary">No bookings yet</p>}
        {!loading && bookings?.length > 0 && bookings.map(booking => (
          <Link to={`/account/bookings/${booking._id}`}>
            <div key={booking._id} className="flex mb-4 bg-gray-200 rounded-2xl overflow-hidden">
              <div className="flex max-w-2xl flex-col items-center rounded-md border md:flex-row">
                <div className="h-full w-full md:h-[200px] md:w-[300px]">
                  <PlaceImg place={booking.place} className="h-full w-full rounded-md object-cover" />
                </div>
                <div>
                  <div className="p-4">
                    <h1 className="inline-flex items-center sm:text-lg font-semibold">{booking.place.title}</h1>
                    <p className="mt-3 text-xs sm:text-sm font-semibold text-black">
                      <BookingDates booking={booking} className="mb-2 mt-4 text-black" />
                    </p>
                    <div className="flex gap-1 items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                      </svg>
                      <span className="text-sm font-semibold">Total price: ₹{booking.price}</span>
                    </div>
                    <button onClick={() => cancelBooking(booking._id)} className="mt-3  bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded-xl">
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>

        ))}
      </div>
    </div>
  );
}
