import prisma from "@/lib/prisma";


export async function findAllUser(){
    return await prisma.user.findMany()
}
// export async function findAllToms(){
//     return await prisma.Data_Truck_From_Toms.findMany()
// }

export async function findOneUser(id) {
    return await prisma.user.findUnique({
      where: { id: id },
    });
  }
  
export async function createNewUser(data){
    return await prisma.user.create({data: data})
}

export async function updateNewUser(id ,data){
    return await prisma.user.update({
        where: {id: id},
        data: data
    })
}

export async function deleteNewUser(id ,data){
    return await prisma.user.dalete({
        where: {id: id},
    })
}
