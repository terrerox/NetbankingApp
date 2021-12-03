import {
    IconButton,
    Avatar,
    Box,
    Flex,
    HStack,
    VStack,
    Text,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { FiChevronDown, FiBell } from "react-icons/fi";
import { useUserStore } from '../store'


const UserProfile = () => {
  const user = useUserStore(state => state.user)

    return (
        <HStack spacing={{ base: "0", md: "6" }}>
            <IconButton
                size="lg"
                variant="ghost"
                aria-label="open menu"
                icon={<FiBell />}
            />
            <Flex alignItems="center">
                <Menu>
                    <MenuButton
                        py={2}
                        transition="all 0.3s"
                        _focus={{ boxShadow: "none" }}
                    >
                        <HStack spacing="4">
                            <Avatar
                                size="md"
                            />
                            <VStack
                                display={{ base: "none", md: "flex" }}
                                alignItems="flex-start"
                                spacing="1px"
                                ml="2"
                            >
                                <Text fontSize="lg">{ user.username }</Text>
                                <Text fontSize="md" color="gray.600">
                                { user.role === 0 ? 'Cliente' : 'Admin' }
                                </Text>
                            </VStack>
                            <Box display={{ base: "none", md: "flex" }}>
                                <FiChevronDown />
                            </Box>
                        </HStack>
                    </MenuButton>
                    <MenuList fontSize="lg" bg="white" borderColor="gray.200">
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>Settings</MenuItem>
                        <MenuItem>Billing</MenuItem>
                        <MenuDivider />
                        <MenuItem>Sign out</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </HStack>
    );
}

export default UserProfile