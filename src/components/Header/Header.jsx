import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from "@/components/ui/button"
import authService from "../../appwrite/auth"
import { useEffect, useState } from 'react'

function Header(props) {

  const authStatus = useSelector((state) => state.auth.status);

      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    async function loadData() {
        try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
        } catch (err) {
            console.log("Auth error:", err);
        }
        setLoading(false);
    }

    if (authStatus) loadData();
    else setUser(null);

}, [authStatus]);   // 👈 rerun when auth changes

 
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true,
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Cart",
      slug: "/bookings/my",
      active: authStatus ,
    },
    {
      name: "Add Property",
      slug: "/add-property",
      active: authStatus && isAdmin,   
    },
  ];

  return (
    <header className={`mt-2 shadow ${props.shadow}`}>
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="40px" />
            </Link>
          </div>

          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Button
                    variant="ghost"
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-auto py-auto duration-200 font-bold hover:text-blue-700"
                  >
                    {item.name}
                  </Button>
                </li>
              ) : null
            )}
           
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
