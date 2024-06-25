import { Navbar,  } from "flowbite-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function NavbarComponent() {
  const count = useSelector((state)=>state.counter.value)

  const menuList = [
    {
      path: "/",
      title: "Home",
    },
    {
      path: "/about",
      title: "About Us",
    },
    {
      path: "/product",
      title: "Product",
    },
    {
      path: "/service",
      title: "Service",
    },
  ];
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          src="/src/assets/react.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span>
      <span className="px-5">{count}</span>

      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {menuList.map((menu, index) => (
          <NavLink
            to={menu.path}
            className={({ isActive }) =>
              isActive ? "text-blue-700" : "text-black"
            }
            key={index}
          >
            {menu.title}
          </NavLink>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
