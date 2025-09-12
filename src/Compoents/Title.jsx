import { useLocation } from "react-router-dom";


const Title = () => {

    const location = useLocation();
    console.log(location);

    return (
        <div className="w-full p-5 shadow-xl rounded bg-white">
            <h1 className="text-2xl text-[#34395E] font-semibold capitalize">
                {location.pathname === "/"
                    ? "Dashboard"
                    : location.pathname.replace("/", "")}
            </h1>
        </div>
    )
}

export default Title