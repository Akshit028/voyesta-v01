// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { UserContext } from "./UserContext";
// import logo from "./assets/voyesta.png"

// export default function Header() {
//     const { user } = useContext(UserContext);
//     return (
//         <header className=' bg-white flex items-center justify-between'>
//             <Link to='/'  className='text-primary flex items-center gap-1'>
//                 <img className="w-24" src={logo} alt="Voyesta" />
//             </Link>
//             <div className="lg:text-2xl xl:text-3xl md:text-xl hidden md:block  font-bold text-primary">
//                 Stays, Experiences and much more...
//             </div>
//             <Link to={user ? '/account' : '/login'} className='flex items-center gap-2 border border-gray-300 rounded-full px-3 py-2 hover:bg-gray-100 '>

//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#6A6A6A" className="w-6 h-6">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//                 </svg>
//                 <div className="bg-[#6A6A6A] text-white rounded-full border border-gray-500 overflow-hidden">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 relative top-1 ">
//                         <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
//                     </svg>
//                 </div>
//                 {!!user && (
//                     <div className="font-semibold">
//                         {user.name}
//                     </div>
//                 )}


//             </Link>
//         </header>

//     );
// }
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import logo from "./assets/voyesta.png"

export default function Header() {
    const { user } = useContext(UserContext);
    return (
        <header className=' bg-white flex items-center justify-between'>
            <Link to={'/'} href="" className='text-primary flex items-center gap-1'>
                <img className="w-24" src={logo} alt="Voyesta" />
            </Link>
            <div className="lg:text-2xl xl:text-3xl md:text-xl hidden md:block  font-bold text-primary">
                Stays, Experiences and much more...
            </div>
            <Link to={user ? '/account' : '/login'} className='flex items-center gap-2 border border-gray-300 rounded-full px-2 py-2 hover:bg-gray-100 '>
                {user ? ( // If user is logged in
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>

                        <div className="font-bold bg-black px-3 py-1 rounded-full text-white line-clamp-1">
                            {user.name.split(' ')[0].charAt(0).toUpperCase()}
                        </div>
                    </div>

                ) : ( // If user is not logged in
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <svg clas xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                        </svg>

                    </div>
                )}



            </Link>
        </header>

    );
}