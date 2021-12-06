import React from 'react'
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiColumns,
    FiCreditCard,
    FiUsers
  } from "react-icons/fi";

import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const linkItems = [
    { label: "Cuentas", icon: FiTrendingUp, to: "/client/accounts" },
    { label: "Prestamos", icon: FiColumns, to: "/client/loans" },
    { label: "Tarjetas", icon: FiCreditCard, to: "/client/cards" }
  ];
  return (
    <Box minH="100vh" bg="gray.50">
      <Sidebar
        onClose={() => onClose}
        linkItems={linkItems}
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
          <Sidebar 
            onClose={onClose}
            linkItems={linkItems} 
           />
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

export default Dashboard
