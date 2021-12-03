import React from 'react'
import { NavLink as ReachLink, useLocation} from "react-router-dom";
import { Flex, Icon, Text, Link } from "@chakra-ui/react";

const NavLink = ({ link, ...rest }) => {
  const { label, to, icon } = link
  const { pathname } = useLocation();
  const isActive = pathname === to
  return (
    <Link
      to={to}
      as={ReachLink}
    >
        <Flex
          align="center"
          p="4"
          mx="4"
          my="2"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          bg={
            isActive && 'teal'
          }
          color={
            isActive && 'white'
          }
          _hover={{
            bg: "teal",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          <Text fontSize="1.2rem">{label}</Text>
        </Flex>
      </Link>
  )
}

export default NavLink
