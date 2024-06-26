import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from '../Image'
import loadinggif from "../assets/loading.gif"

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen">
      {loading ? ( // If loading is true, display loading animation
        <div className="flex justify-center items-center"><img src={loadinggif} alt="loading" /></div>
      ) : (
        <div className=" mt-8 mb-8 gap-x-6 gap-y-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 ">
          {places.length > 0 && places.map(place => (
            <Link to={'/place/' + place._id}>
              <div className=" bg-gray-500 mb-2 rounded-2xl flex">
                {place.photos?.[0] && (
                  <Image className="rounded-2xl object-cover aspect-square " src={place.photos?.[0]} alt="" />
                )}
              </div>
              <h2 className=" font-bold text-sm ">{place.address}</h2>
              <h3 className=" text-sm text-gray-500 ">{place.title}</h3>

              <div className="mt-1 text-sm">
                <span className=" font-bold"> ₹{place.price} </span>per night
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>

  );
}