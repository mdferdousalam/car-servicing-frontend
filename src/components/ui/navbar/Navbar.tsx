import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/car-washing-brand-logo.png";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import {
  logout,
  useCurrentToken,
} from "../../../redux/features/auth/authSlice";
import { verifyToken } from "../../../utils/VerifyToken";
import { menuItems } from "./NavMenuItems";

// Define the User type
interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

const Navbar: React.FC = () => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  let user: User | undefined;

  if (token) {
    user = verifyToken(token) as User;
  }

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { onOpen } = useDisclosure();

  const toggleDropdown = (id: string | null) => {
    setActiveDropdown((prevId) => (prevId === id ? null : id));
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Box>
      {/* Bottom Section: Navbar Links */}
      <Flex align="center" justify="space-between" py={5} maxW="7xl" mx="auto">
        {/* Left: Logo */}
        <Box>
          <RouterLink to="/">
            <HStack>
              <Image src={logo} alt="Logo" height={200} width={200} />
            </HStack>
          </RouterLink>
        </Box>

        {/* Center: Navigation Links */}
        <HStack
          spacing={6}
          color="#424649"
          display={{ base: "none", lg: "flex" }}
        >
          {menuItems.map((item) => (
            <Box key={item.label} position="relative">
              {item.dropdown ? (
                <Menu isOpen={activeDropdown === item.id}>
                  <MenuButton
                    onClick={() => toggleDropdown(item.id ?? null)}
                    aria-expanded={activeDropdown === item.id}
                    as={Button}
                    variant="ghost"
                    fontWeight="medium"
                    _hover={{ color: "#0068d8" }}
                    _active={{ color: "#0068d8" }}
                  >
                    {item.label}
                  </MenuButton>
                  <MenuList zIndex={50}>
                    {item.columns?.[0]?.links.map((link) => (
                      <MenuItem
                        as={RouterLink}
                        to={link.path}
                        key={link.path}
                        _hover={{ bg: "gray.100", color: "blue.800" }}
                        _active={{ color: "#0068d8" }}
                      >
                        {link.label}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              ) : (
                <RouterLink
                  to={item.path || "/"}
                  className="px-2 py-1 text-sm font-medium hover:text-[#0068d8] active:text-[#0068d8]"
                >
                  {item.label}
                </RouterLink>
              )}
            </Box>
          ))}
        </HStack>

        {/* Right: Search Icon and Profile Dropdown */}
        <HStack spacing={4}>
          {/* Profile Dropdown */}
          <Menu>
            <MenuButton
              as={Button}
              onClick={onOpen}
              rounded="full"
              variant="link"
              cursor="pointer"
              minW={0}
            >
              <Avatar size="sm" bg="teal.500" />
            </MenuButton>
            <MenuList>
              {user?.role === "admin" && (
                <MenuGroup title="Admin">
                  <MenuItem as={RouterLink} to="/dashboard/admin-dashboard">
                    Admin Dashboard
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/settings">
                    Settings
                  </MenuItem>
                </MenuGroup>
              )}

              {user?.role === "user" && (
                <MenuGroup title="User">
                  <MenuItem as={RouterLink} to="/dashboard/user-dashboard">
                    User Dashboard
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/profile">
                    Profile
                  </MenuItem>
                </MenuGroup>
              )}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
