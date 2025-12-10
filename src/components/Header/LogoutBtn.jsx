import React from 'react'
import { Button } from "@/components/ui/button"
import authService from '../../appwrite/auth'

function LogoutBtn() {

    const logoutHandler = async () => {
        await authService.logout();

        //  Force Home to run useEffect() again
        window.location.href = "/";
    };

    return (
        <Button
            className='flex ml-auto inline-bock px-6 py-2 duration-200 hover:text-red-500 square-full'
            onClick={logoutHandler}
        >
            Logout
        </Button>
    );
}

export default LogoutBtn;
