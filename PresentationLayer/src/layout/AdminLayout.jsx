import React from 'react'
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
const AdminLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" bg="gray.50">
        <Sidebar
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <Sidebar onClose={onClose} />
          </DrawerContent>
        </Drawer>
  
        {/*= Header =*/}
        <Header onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p="4">
            <Outlet />
        </Box>
      </Box>
    )
}

export default AdminLayout
