import React from 'react'
import { Link } from "react-router-dom";
import { Flex, Icon, Text } from "@chakra-ui/react";

const NavLink = ({ link, ...rest }) => {
    const { label, to, icon } = link;
    return (
        <Link to={to} as="a">
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              bg: "cyan.400",
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
