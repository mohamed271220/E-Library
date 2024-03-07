import { Outlet } from "react-router-dom"

const index = () => {
    return (
        <div className="flex mt-[2vh] items-center justify-center p-[3vh]">
            <div className="shadow-lg w-full md:w-[50%] p-[3vh]">
                <Outlet />
            </div>
        </div>
    )
}

export default index