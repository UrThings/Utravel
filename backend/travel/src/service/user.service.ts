
import prisma from '../database'

export const removeUsers = async (userId: string) => {
    try {
        await prisma.user.delete({
            where: {
                id: userId
            }
        })
        return { message: "User deleted "}
    } catch (error) {
        return { message: error.message }
    }
}



export const checkUser = async (phone:string) => {
    const user = await prisma.user.findUnique({
        where: { phone }
    });
    return user
}



export const signups = async (phone: string, encryptedPassword: string) => {

    const newUser = await prisma.user.create({
        data: {
            phone,
            password: encryptedPassword
        }
    });


    return newUser;
};


export const makeAdmin = async (id: string) => {
    try {
        await prisma.user.update({
            where: {
                id
            },
            data: {
                position: "admin"
            }
        })
        return { message: "User is now an admin" }
    } catch (error) {
        return { message: "Cannot make user an admin" }
    }
}





export const logins = async (phone: string, password: string) =>{
    
    const user = await prisma.user.findUnique({
        where:{
            phone
        }
        
    })

    
    return user
} 



export const getUser = async () => {
    const users = await prisma.user.findMany()
    return users;
}