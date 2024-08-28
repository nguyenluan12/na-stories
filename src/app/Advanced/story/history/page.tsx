import ListStory from "~/components/story/ListStory";
import { prisma } from "~/lib/prisma"

async function GetStory() {
    const listStory = await prisma.storyGenerated.findMany();
    console.log(listStory[0])
    return(
        <ListStory listStory={listStory}/>
    )
}

export default function HistoryStory(){
    
    return(
        <GetStory />
    )
}