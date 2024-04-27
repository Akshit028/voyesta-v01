

import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import Swal from 'sweetalert2';
import Image from '../Image';


export default function PlacesPage() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data);
        });
    }, []);

    const removePlace = async (placeId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to remove this place!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'No, keep it'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`/places/${placeId}`);
                setPlaces(prevPlaces => prevPlaces.filter(place => place._id !== placeId));
                Swal.fire('Removed!', 'Your place has been removed.', 'success').then(() => {
                    // Redirect to home page after clicking OK on the Swal dialog
                    window.location.href = '/'; // Redirect to the home page
                });
            } catch (error) {
                Swal.fire('Error!', 'Failed to remove place.', 'error');
            }
        }
    };


    return (
        <div>
            <AccountNav />
            <div className="text-center">
                <Link className="inline-flex gap-1 bg-gray-200 hover:bg-gray-100 py-2 px-6 rounded-2xl" to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place
                </Link>
            </div>
            <div className="mt-8 min-h-screen">
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places/' + place._id} className="flex cursor-pointer gap-4 mb-4 bg-gray-200 p-4 rounded-2xl">
                        <div className="flex w-32 h-32 shrink-0">
                            {place.photos.length > 0 && (
                                <Image className='object-cover' src={place.photos[0]} alt="" />
                            )}
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl line-clamp-1">{place.title}</h2>
                            <p className="text-sm mt-2 line-clamp-4">{place.description}</p>
                            <div className="pl-4">
                                <button onClick={() => removePlace(place._id)} className="mt-3 bg-primary text-sm hover:bg-primary/80  text-white font-semibold py-2 px-4 rounded-xl ">
                                    Remove Place
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
