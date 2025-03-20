import prisma from '../database'

export const removeFromCarts = async (userId: string, travelId: string) => {
    const cardItem = await prisma.cartTravel.findFirst({
        where: {
            userId,
            travelId
        }
    })
    if(!cardItem){
        return { message: "Item not found" }
    }
    await prisma.cartTravel.delete({    
        where: {
            id: cardItem.id
        }
    })
    await prisma.travel.update({
        where: {
            id: travelId
        },
        data: {
            countNow: { decrement: cardItem.count }
        }
    })
    return { message: "Item removed" }
        
}


export const removeAllFromCarts = async (userId: string) => {
    try {
      await prisma.cartTravel.deleteMany({
        where: {
          userId
        }
      })
      return { message: "Travels Removed" }
    } catch (error) {
      return { message: "Cannot Remove Travels" }
    }
  }

  
  export const pays = async (userId: string, travelId: string, name: string, img: string) => {
    const cartItems = await prisma.cartTravel.findFirst({
        where: { userId, travelId }
    });

    if (!cartItems) {
        throw new Error('Сагсанд ийм аялал байхгүй байна.');
    }

    await prisma.bookedTravel.create({
        data: {
            userId,
            travelId,
            count: cartItems.count, 
            img,
            name
        }
    });

    await prisma.cartTravel.delete({
        where: { id: cartItems.id } 
    });

    return cartItems;
};


export const getTravelCarts = async (userId: string) => {
    return await prisma.cartTravel.findMany({
        where: {
            userId: userId,  // Хэрэглэгчийн ID-тай холбогдсон аяллуудыг зөвхөн авна
        },
    });
};


export const cartLists = async () => {
    const result = await prisma.cartTravel.findMany();
    return result;
}


export const addToCarts = async (userId: string, travelId: string, count: number, img: string, name: string ) => {
    const travel = await prisma.travel.findUnique({
        where:{
            id: travelId
        }
    });
    if(!travel || travel.countNow + count > travel.limit){
        return("zahialah bolomjgvi ucir ni aylah hvmvvsiin too bvrdsen bna")
    }
    await prisma.cartTravel.create({
        data:{
            userId,
            travelId,
            count,
            img,
            name
        }
    });
    await prisma.travel.update({
        where:{
            id: travelId
        },
        data:{
            countNow: { increment: count }
        }
    })
}