import prisma from "../database";

export const getTravelBooked = async (userId: string) => {
    return await prisma.bookedTravel.findMany({
        where:{userId}
    })
}

export const bookedLists = async (userId: string) => {
    return await prisma.bookedTravel.findMany({
        where:{userId}
    })
}
