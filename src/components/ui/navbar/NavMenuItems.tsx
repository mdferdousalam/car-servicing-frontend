type LinkItem = {
  label: string;
  path: string;
};

type DropdownColumn = {
  links: LinkItem[];
};

type MenuItem = {
  label: string;
  path?: string;
  dropdown?: boolean;
  id?: string;
  columns?: DropdownColumn[];
};

export const menuItems: MenuItem[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Services",
    path: "/services",
  },
  {
    label: "Booking",
    path: "/booking",
  },
  {
    label: "Sign-Up",
    path: "/signup",
  },
  {
    label: "Login",
    path: "/login",
  },
];
