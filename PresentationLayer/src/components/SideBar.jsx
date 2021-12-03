import React from 'react'
import { Box, CloseButton, Flex, Text } from "@chakra-ui/react";
import NavLink from "./NavLink";

import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiUsers
} from "react-icons/fi";


const LinkItems = [
    { label: "Clientes", icon: FiUsers, to: "/admin/clients" },
    { label: "Trending", icon: FiTrendingUp, to: "/" },
    { label: "Explore", icon: FiCompass, to: "/" },
    { label: "Favourites", icon: FiStar, to: "/" },
    { label: "Settings", icon: FiSettings, to: "/" },
];

const SideBar = ({ onClose, ...rest }) => {
    return (
        <Box
            transition="3s ease"
            bg="white"
            borderRight="1px"
            borderRightColor="gray.200"
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Logo
                </Text>
                <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link, i) => (
                <NavLink key={i} link={link} />
            ))}
        </Box>
    )
}

export default SideBar
