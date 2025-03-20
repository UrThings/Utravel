import prisma from "../database";

export const addTravel = async (
  name: string,
  Enddate: string, 
  Startdate: string, 
  marshrut: string,
  price: number,
  limit: number,
  img: string
) => {
  await prisma.travel.create({
    data: {
      name,
      Startdate: new Date(Startdate), // ISO String-ийг `Date` болгож хөрвүүлэх
      Enddate: new Date(Enddate),
      marshrut,
      price: price,
      limit: limit,
      img,
    },
  });
};

export const getTravels = async () => {
    const travel = await prisma.travel.findMany()
    return travel;
}

export const removeTravel = async (id: string) => {
    const travel = await prisma.travel.findUnique({
        where:{
            id
        }
    });
    if(!travel){
        return("zahialah bolomjggvi")
    }
    await prisma.cartTravel.deleteMany({
        where:{travelId: id}
    })

    await prisma.bookedTravel.deleteMany({
        where:{travelId: id}
    })

    await prisma.travel.delete({
        where:{
            id
        }
    })
   
}