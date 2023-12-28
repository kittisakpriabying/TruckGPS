import prisma from "@/lib/prisma";


export async function findAllLocations(){
    return await prisma.locations.findMany()
}


export async function findOneLocations(id) {
    return await prisma.locations.findUnique({
      where: { id: id },
    });
  }
  
export async function createNewLocations(data){
    return await prisma.locations.create({data: data})
}

export async function updateNewLocations(id ,data){
    return await prisma.locations.update({
        where: {id: id},
        data: data
    })
}

export async function deleteNewLocations(id ,data){
    return await prisma.locations.dalete({
        where: {id: id},
    })
}
