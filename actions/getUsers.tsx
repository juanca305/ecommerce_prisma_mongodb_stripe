
import prisma from '@/lib/prismadb'

export default async function getUsers() {
    try {
        const users = prisma?.user.findMany();
        return users;
    } catch (error: any) {
        throw new Error(error)
    }
}

// const getUsers = async () => {
//     try {
//         const users = prisma?.user.findMany();
//         return users;
//     } catch (error: any) {
//         throw new Error(error);
//     }

//   return (
//     <div>getUsers</div>
//   )
// }

// export default getUsers