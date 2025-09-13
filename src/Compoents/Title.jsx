// import { useLocation } from "react-router-dom";


// const Title = () => {

//     const location = useLocation();
//     console.log(location);

//     return (
//         <div className="w-full p-5 rounded bg-white flex justify-between items-center">
//             <h1 className="text-2xl text-[#34395E] font-semibold capitalize">
//                 {location.pathname === "/"
//                     ? "Dashboard"
//                     : location.pathname.replace("/", "")}
//             </h1>
//             {/* Breadcrumb*/}
//             <nav className="text-sm text-gray-600" aria-label="Breadcrumb">
//                 <ol className="list-none p-0 inline-flex">
//                     <li className="flex items-center">
//                         <a href="/" className="hover:underline">Home</a>
//                         {location.pathname !== "/" && (
//                             <>
//                                 <svg className="h-5 w-auto text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                                 </svg>
//                                 <a href={location.pathname} className="hover:underline">
//                                     {location.pathname.replace("/", "")}
//                                 </a>
//                             </>
//                         )}
//                     </li>
//                 </ol>
//             </nav>
//         </div>
//     )
// }

// export default Title




import { useLocation, Link } from "react-router-dom";

const Title = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(Boolean);

    return (
        <div className="w-full p-5 rounded bg-white flex justify-between items-center">
            <h1 className="text-2xl text-[#34395E] font-bold capitalize">
                {location.pathname === "/"
                    ? "Dashboard"
                    : pathnames[pathnames.length - 1]}
            </h1>
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
                <Link to="/" className="hover:underline">Dashboard</Link>
                {pathnames.map((name, idx) => (
                    <span key={idx} className="flex items-center">
                        <span className="mx-1">/</span>
                        {idx === pathnames.length - 1 ? (
                            <span className="capitalize">{name}</span>
                        ) : (
                            <Link
                                to={`/${pathnames.slice(0, idx + 1).join("/")}`}
                                className="hover:underline capitalize"
                            >
                                {name}
                            </Link>
                        )}
                    </span>
                ))}
            </nav>
        </div>
    )
}

export default Title