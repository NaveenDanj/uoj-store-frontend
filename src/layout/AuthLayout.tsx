import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="h-full w-full">
            <Outlet />
        </div>
    )
}