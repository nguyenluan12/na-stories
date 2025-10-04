import ListStory from "~/components/story/ListStory";
import { prisma } from "~/lib/prisma"
type Story = {
    id: string;
    title: string;
    content: string;
    translate: string;
    ask: {
        answer:string,
        question:string,
    }[];
    img: string;
}
async function GetStory() {
    const listStory = await prisma.storyGenerated.findMany();
    const stories: Story[] = listStory.map((s) => ({
        ...s,
        ask: s.ask as { answer: string; question: string }[], // ép kiểu
    }));
    return(
        <ListStory listStory={stories}/>
    )
}

export default function HistoryStory(){
    
    return(
        <GetStory />
    )
}