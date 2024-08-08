"use strict";
// import { PrismaClient } from "@prisma/client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// const prisma = new PrismaClient();
// const rawData = [
//   {
//     title: "Greetings",
//     image: "https://example.com/image1.jpg",
//     type: "play",
//     lesson: `[
//       {"id": "0", "content": "Hello", "gapIndexes": [0], "translation": "Xin chào"},
//       {"id": "1", "content": "Good morning", "gapIndexes": [1], "translation": "Chào buổi sáng"},
//       {"id": "2", "content": "Good afternoon", "gapIndexes": [1], "translation": "Chào buổi chiều"},
//       {"id": "3", "content": "Good evening", "gapIndexes": [1], "translation": "Chào buổi tối"},
//       {"id": "4", "content": "Good night", "gapIndexes": [1], "translation": "Chúc ngủ ngon"},
//       {"id": "5", "content": "How are you?", "gapIndexes": [2], "translation": "Bạn khỏe không?"},
//       {"id": "6", "content": "I'm fine", "gapIndexes": [1], "translation": "Tôi khỏe"},
//       {"id": "7", "content": "Nice to meet you", "gapIndexes": [3], "translation": "Rất vui được gặp bạn"},
//       {"id": "8", "content": "See you later", "gapIndexes": [0], "translation": "Hẹn gặp lại"},
//       {"id": "9", "content": "Goodbye", "gapIndexes": [0], "translation": "Tạm biệt"}
//     ]`,
//     learned: "no"
//   },
//   {
//     title: "Daily Activities",
//     image: "https://example.com/image2.jpg",
//     type: "play",
//     lesson: `[
//       {"id": "0", "content": "Wake up", "gapIndexes": [1], "translation": "Thức dậy"},
//       {"id": "1", "content": "Brush teeth", "gapIndexes": [1], "translation": "Đánh răng"},
//       {"id": "2", "content": "Have breakfast", "gapIndexes": [1], "translation": "Ăn sáng"},
//       {"id": "3", "content": "Go to school", "gapIndexes": [2], "translation": "Đi học"},
//       {"id": "4", "content": "Have lunch", "gapIndexes": [1], "translation": "Ăn trưa"},
//       {"id": "5", "content": "Do homework", "gapIndexes": [1], "translation": "Làm bài tập"},
//       {"id": "6", "content": "Play sports", "gapIndexes": [1], "translation": "Chơi thể thao"},
//       {"id": "7", "content": "Have dinner", "gapIndexes": [1], "translation": "Ăn tối"},
//       {"id": "8", "content": "Watch TV", "gapIndexes": [0], "translation": "Xem TV"},
//       {"id": "9", "content": "Go to bed", "gapIndexes": [2], "translation": "Đi ngủ"}
//     ]`,
//     learned: "no"
//   },
//   {
//     title: "Shopping",
//     image: "https://example.com/image3.jpg",
//     type: "listen-and-read",
//     lesson: `[
//       {"id": "0", "content": "Can I help you?", "character": "A", "gapIndexes": [3], "translation": "Tôi có thể giúp gì cho bạn?"},
//       {"id": "1", "content": "I'm looking for a dress", "character": "B", "gapIndexes": [4], "translation": "Tôi đang tìm một chiếc váy"},
//       {"id": "2", "content": "What size do you need?", "character": "A", "gapIndexes": [3], "translation": "Bạn cần kích cỡ nào?"},
//       {"id": "3", "content": "Size M, please", "character": "B", "gapIndexes": [2], "translation": "Kích cỡ M, làm ơn"},
//       {"id": "4", "content": "Here you go", "character": "A", "gapIndexes": [2], "translation": "Đây bạn"},
//       {"id": "5", "content": "How much is it?", "character": "B", "gapIndexes": [2], "translation": "Nó bao nhiêu tiền?"},
//       {"id": "6", "content": "It's $50", "character": "A", "gapIndexes": [1], "translation": "Nó giá 50 đô la"},
//       {"id": "7", "content": "I'll take it", "character": "B", "gapIndexes": [3], "translation": "Tôi sẽ lấy nó"},
//       {"id": "8", "content": "Do you need a bag?", "character": "A", "gapIndexes": [3], "translation": "Bạn có cần túi không?"},
//       {"id": "9", "content": "No, thank you", "character": "B", "gapIndexes": [1], "translation": "Không, cảm ơn"}
//     ]`,
//     learned: "no"
//   },
//   {
//     title: "Travel",
//     image: "https://example.com/image4.jpg",
//     type: "listen-and-read",
//     lesson: `[
//       {"id": "0", "content": "Where are you going?", "character": "A", "gapIndexes": [3], "translation": "Bạn đi đâu?"},
//       {"id": "1", "content": "I'm going to Paris", "character": "B", "gapIndexes": [3], "translation": "Tôi đang đi Paris"},
//       {"id": "2", "content": "How long will you stay?", "character": "A", "gapIndexes": [3], "translation": "Bạn sẽ ở lại bao lâu?"},
//       {"id": "3", "content": "For a week", "character": "B", "gapIndexes": [2], "translation": "Trong một tuần"},
//       {"id": "4", "content": "Have a great trip", "character": "A", "gapIndexes": [4], "translation": "Chúc bạn có một chuyến đi tuyệt vời"},
//       {"id": "5", "content": "Thank you!", "character": "B", "gapIndexes": [1], "translation": "Cảm ơn bạn!"},
//       {"id": "6", "content": "Do you need a map?", "character": "A", "gapIndexes": [3], "translation": "Bạn có cần bản đồ không?"},
//       {"id": "7", "content": "Yes, please", "character": "B", "gapIndexes": [1], "translation": "Vâng, làm ơn"},
//       {"id": "8", "content": "Here it is", "character": "A", "gapIndexes": [2], "translation": "Đây bạn"},
//       {"id": "9", "content": "Thanks again", "character": "B", "gapIndexes": [2], "translation": "Cảm ơn lần nữa"}
//     ]`,
//     learned: "no"
//   }
// ];
// async function main() {
//   // Xoá tất cả dữ liệu cũ
//   await prisma.lesson.deleteMany();
//   await prisma.listLesson.deleteMany();
//   // Tạo bản ghi listLesson cho level 1
//   const listLessonLevel1 = await prisma.listLesson.create({
//     data: {
//       level: "1"
//     }
//   });
//   // Tạo các bài học và liên kết với listLesson level 1
//   for (const data of rawData) {
//     await prisma.lesson.create({
//       data: {
//         title: data.title,
//         image: data.image,
//         type: data.type,
//         lesson: JSON.parse(data.lesson),
//         learned: data.learned,
//         listLessonId: listLessonLevel1.level // Liên kết bài học với listLesson level 1
//       }
//     });
//   }
//   const allLists = await prisma.listLesson.findMany({
//     include: {
//       list: true,
//     },
//   });
//   console.log(allLists);
// }
// main()
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
var fs_1 = require("fs");
var path_1 = require("path");
var openai_1 = require("openai");
var openai = new openai_1.default({
    organization: "org-".concat(process.env.OPENAI_API_KEY),
    project: "proj_4kT9g8r7bXqtBegNhmjhYdpr",
});
var speechFile = path_1.default.resolve("./speech.mp3");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var mp3, buffer, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, openai.audio.speech.create({
                        model: "tts-1",
                        voice: "alloy",
                        input: "Today is a wonderful day to build something people love!",
                    })];
                case 1:
                    mp3 = _c.sent();
                    console.log(speechFile);
                    _b = (_a = Buffer).from;
                    return [4 /*yield*/, mp3.arrayBuffer()];
                case 2:
                    buffer = _b.apply(_a, [_c.sent()]);
                    return [4 /*yield*/, fs_1.default.promises.writeFile(speechFile, buffer)];
                case 3:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main();
