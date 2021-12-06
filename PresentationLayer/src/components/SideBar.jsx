import React from 'react'
import { Box, CloseButton, Flex, Text } from "@chakra-ui/react";
import NavLink from "./NavLink";

const SideBar = ({ linkItems, onClose, ...rest }) => {

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
                    Netbanking
                </Text>
                <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
            </Flex>
            {  
                linkItems.map((link, i) => (
                    <NavLink key={i} link={link} />
                ))
            }
        </Box>
    )
}

export default SideBar
