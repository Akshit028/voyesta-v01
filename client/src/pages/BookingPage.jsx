import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className="my-8 max-w-5xl mx-auto ">
      <h1 className=" text-2xl font-bold text-primary mb-4">Your reservation is confirmed</h1>
      <h1 className=" text-3xl">{booking.place.title}</h1>
      <AddressLink className=" my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-4 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-md sm:text-2xl mb-4">Your booking information</h2>
          <BookingDates className='text-[11px] sm:text-lg' booking={booking} />
        </div>
        <div className=" bg-gray-300 p-2 rounded-2xl">
          <div  className="flex gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 hidden sm:block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
              />
            </svg>
            <p className="hidden sm:block">
              Total Price:
            </p>
          </div>
          <div className="font-semibold sm:text-3xl">₹{booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place}  />
    </div>
  );
}
