// import { useContext, useState } from "react";
// import { UserContext } from "../UserContext.jsx";
// import { Link, Navigate, useParams } from "react-router-dom";
// import axios from "axios";
// import PlacesPage from "./PlacesPage.jsx";
// import AccountNav from "../AccountNav.jsx";

// export default function ProfilePage() {
//     const [redirect, setRedirect] = useState(null);
//     const { ready, user, setUser } = useContext(UserContext);
//     let { subpage } = useParams();
//     if (subpage === undefined) {
//         subpage = 'profile';
//     }

//     async function logout() {
//         await axios.post('/logout');
//         setRedirect('/');
//         setUser(null);


//     }

//     if (!ready) {
//         return 'Loading...';
//     }

//     if (ready && !user && !redirect) {
//         return <Navigate to={'/login'} />
//     }


//     if (redirect) {
//         return <Navigate to={redirect} />
//     }

//     return (
//         <div>
//             <AccountNav />
//             {subpage === 'profile' && (
//                 <div className="text-center max-w-lg min-h-screen mx-auto">
//                     <div className="border rounded-xl pt-4 pb-96">
//                         <h1 className="text-2xl font-bold mb-8">Account</h1>
//                         <hr />
//                         <h1 className="text-xl font-semibold mt-4 mb-2">Welcome, {user.name} </h1>
//                         <h1 className="text-xl font-semibold mb-2">Email : {user.email}</h1>
//                     <button onClick={logout} className=" primary p-2 w-1/2 rounded-2xl  mt-2">Logout</button>
//                     </div>
//                 </div>
//             )}
//             {subpage === 'places' && (
//                 <PlacesPage />
//             )}
//         </div>
//     );
// }
import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage.jsx";
import AccountNav from "../AccountNav.jsx";
import loadinggif from "../assets/loading.gif"

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);


    }

    if (!ready) {
        return <div className="flex justify-center"><img src={loadinggif} alt="loading" /></div>;
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }


    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="text-center max-w-lg min-h-screen mx-auto">
                    <div className="border rounded-xl pt-4 pb-96">
                        <h1 className="text-2xl font-bold mb-8">Account</h1>
                        <hr />
                        <h1 className="sm:text-xl font-semibold mt-4 mb-2">Welcome, {user.name} </h1>
                        <h1 className="sm:text-xl font-semibold mb-2">Email : {user.email}</h1>
                    <button onClick={logout} className=" primary p-2 w-1/2 rounded-2xl  mt-2">Logout</button>
                    </div>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    );
}