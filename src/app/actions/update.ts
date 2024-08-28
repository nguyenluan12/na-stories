"use server"
import { prisma } from "~/lib/prisma";

export async function updateData(email: string, imgSrc: string, name: string) {
    const user = await prisma.user.upsert({
      where: { email: email },  // Điều kiện tìm kiếm user
      update: {                  // Nếu tồn tại, cập nhật dữ liệu
        avatar: imgSrc,
        name: name,
      },
      create: {                  // Nếu không tồn tại, tạo mới
        email: email,
        avatar: imgSrc,
        name: name,
      },
    });
  
    
  }
  