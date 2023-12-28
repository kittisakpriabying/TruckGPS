
const { findOneUser, removeNewsType, updateNewsType } = require("@/services/user.service");
const { Prisma } = require("@prisma/client");
const { NextRequest, NextResponse } = require("next/server");

export async function GET(request, params) {
    const data = await findOneUser(+params.params.id);

    if (!data) {
        return NextResponse.json({ message: "ไม่พบข้อมูลนี้ในระบบ" }, { status: 404 });
    }

    return NextResponse.json(data);
}

export async function PUT(request, params) {
    const data = await findOneNewsType(+params.params.id);
    if (!data) {
        return NextResponse.json({ message: "ไม่พบข้อมูลนี้ในระบบ" }, { status: 404 });
    }

    // UPDATE
    const bodyJson = await request.json();
    const dataUpdate = await updateNewsType(+params.params.id, bodyJson);

    return NextResponse.json(dataUpdate);
}

export async function DELETE(request, params) {
    const data = await findOneNewsType(+params.params.id);
    if (!data) {
        return NextResponse.json({ message: "ไม่พบข้อมูลนี้ในระบบ" }, { status: 404 });
    }

    // DELETE
    await removeNewsType(+params.params.id);

    return NextResponse.json({
        message: "ลบข้อมูลสำเร็จ"
    });
}
