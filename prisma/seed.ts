import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const rawData = [
  {
    title: "Greetings",
    image: "https://example.com/image1.jpg",
    type: "play",
    lesson: `[
      {"id": "0", "content": "Hello", "gapIndexes": [0], "translation": "Xin chào"},
      {"id": "1", "content": "Good morning", "gapIndexes": [1], "translation": "Chào buổi sáng"},
      {"id": "2", "content": "Good afternoon", "gapIndexes": [1], "translation": "Chào buổi chiều"},
      {"id": "3", "content": "Good evening", "gapIndexes": [1], "translation": "Chào buổi tối"},
      {"id": "4", "content": "Good night", "gapIndexes": [1], "translation": "Chúc ngủ ngon"},
      {"id": "5", "content": "How are you?", "gapIndexes": [2], "translation": "Bạn khỏe không?"},
      {"id": "6", "content": "I'm fine", "gapIndexes": [1], "translation": "Tôi khỏe"},
      {"id": "7", "content": "Nice to meet you", "gapIndexes": [3], "translation": "Rất vui được gặp bạn"},
      {"id": "8", "content": "See you later", "gapIndexes": [0], "translation": "Hẹn gặp lại"},
      {"id": "9", "content": "Goodbye", "gapIndexes": [0], "translation": "Tạm biệt"}
    ]`,
    learned: "no"
  },
  {
    title: "Daily Activities",
    image: "https://example.com/image2.jpg",
    type: "play",
    lesson: `[
      {"id": "0", "content": "Wake up", "gapIndexes": [1], "translation": "Thức dậy"},
      {"id": "1", "content": "Brush teeth", "gapIndexes": [1], "translation": "Đánh răng"},
      {"id": "2", "content": "Have breakfast", "gapIndexes": [1], "translation": "Ăn sáng"},
      {"id": "3", "content": "Go to school", "gapIndexes": [2], "translation": "Đi học"},
      {"id": "4", "content": "Have lunch", "gapIndexes": [1], "translation": "Ăn trưa"},
      {"id": "5", "content": "Do homework", "gapIndexes": [1], "translation": "Làm bài tập"},
      {"id": "6", "content": "Play sports", "gapIndexes": [1], "translation": "Chơi thể thao"},
      {"id": "7", "content": "Have dinner", "gapIndexes": [1], "translation": "Ăn tối"},
      {"id": "8", "content": "Watch TV", "gapIndexes": [0], "translation": "Xem TV"},
      {"id": "9", "content": "Go to bed", "gapIndexes": [2], "translation": "Đi ngủ"}
    ]`,
    learned: "no"
  },
  {
    title: "Shopping",
    image: "https://example.com/image3.jpg",
    type: "listen-and-read",
    lesson: `[
      {"id": "0", "content": "Can I help you?", "character": "A", "gapIndexes": [3], "translation": "Tôi có thể giúp gì cho bạn?"},
      {"id": "1", "content": "I'm looking for a dress", "character": "B", "gapIndexes": [4], "translation": "Tôi đang tìm một chiếc váy"},
      {"id": "2", "content": "What size do you need?", "character": "A", "gapIndexes": [3], "translation": "Bạn cần kích cỡ nào?"},
      {"id": "3", "content": "Size M, please", "character": "B", "gapIndexes": [2], "translation": "Kích cỡ M, làm ơn"},
      {"id": "4", "content": "Here you go", "character": "A", "gapIndexes": [2], "translation": "Đây bạn"},
      {"id": "5", "content": "How much is it?", "character": "B", "gapIndexes": [2], "translation": "Nó bao nhiêu tiền?"},
      {"id": "6", "content": "It's $50", "character": "A", "gapIndexes": [1], "translation": "Nó giá 50 đô la"},
      {"id": "7", "content": "I'll take it", "character": "B", "gapIndexes": [3], "translation": "Tôi sẽ lấy nó"},
      {"id": "8", "content": "Do you need a bag?", "character": "A", "gapIndexes": [3], "translation": "Bạn có cần túi không?"},
      {"id": "9", "content": "No, thank you", "character": "B", "gapIndexes": [1], "translation": "Không, cảm ơn"}
    ]`,
    learned: "no"
  },
  {
    title: "Travel",
    image: "https://example.com/image4.jpg",
    type: "listen-and-read",
    lesson: `[
      {"id": "0", "content": "Where are you going?", "character": "A", "gapIndexes": [3], "translation": "Bạn đi đâu?"},
      {"id": "1", "content": "I'm going to Paris", "character": "B", "gapIndexes": [3], "translation": "Tôi đang đi Paris"},
      {"id": "2", "content": "How long will you stay?", "character": "A", "gapIndexes": [3], "translation": "Bạn sẽ ở lại bao lâu?"},
      {"id": "3", "content": "For a week", "character": "B", "gapIndexes": [2], "translation": "Trong một tuần"},
      {"id": "4", "content": "Have a great trip", "character": "A", "gapIndexes": [4], "translation": "Chúc bạn có một chuyến đi tuyệt vời"},
      {"id": "5", "content": "Thank you!", "character": "B", "gapIndexes": [1], "translation": "Cảm ơn bạn!"},
      {"id": "6", "content": "Do you need a map?", "character": "A", "gapIndexes": [3], "translation": "Bạn có cần bản đồ không?"},
      {"id": "7", "content": "Yes, please", "character": "B", "gapIndexes": [1], "translation": "Vâng, làm ơn"},
      {"id": "8", "content": "Here it is", "character": "A", "gapIndexes": [2], "translation": "Đây bạn"},
      {"id": "9", "content": "Thanks again", "character": "B", "gapIndexes": [2], "translation": "Cảm ơn lần nữa"}
    ]`,
    learned: "no"
  }
];

async function main() {
  // Xoá tất cả dữ liệu cũ
  await prisma.lesson.deleteMany();
  await prisma.listLesson.deleteMany();

  // Tạo bản ghi listLesson cho level 1
  const listLessonLevel1 = await prisma.listLesson.create({
    data: {
      level: "1"
    }
  });

  // Tạo các bài học và liên kết với listLesson level 1
  for (const data of rawData) {
    await prisma.lesson.create({
      data: {
        title: data.title,
        image: data.image,
        type: data.type,
        lesson: JSON.parse(data.lesson),
        learned: data.learned,
        listLessonId: listLessonLevel1.level // Liên kết bài học với listLesson level 1
      }
    });
  }

  const allLists = await prisma.listLesson.findMany({
    include: {
      list: true,
    },
  });

  console.log(allLists);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
