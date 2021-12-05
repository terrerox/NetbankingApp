export const randomAccountNumber = () => {
    const random = Math.random()
        .toString()
        .substr(8)
    return random
}