import {
    PollyClient,
    StartSpeechSynthesisTaskCommand,
  } from "@aws-sdk/client-polly";

  type Sentence ={

    id:string;
    content:string
  }
const pollyClient= new PollyClient({ region: "ap-southeast-1" });

export async function generateAudio(prefix: string, sentence: Sentence) {
    const voiceIds = ["Danielle", "Gregory", "Joanna", "Kendra", "Kimberly", "Salli", "Joey", "Kevin", "Matthew"]
  
    const randomVoiceId = voiceIds[Math.floor(Math.random() * voiceIds.length)];
  
    try {
      const config:any = {
        Engine: "neural",
        OutputFormat: "mp3",
        OutputS3BucketName: "naschool-dev-bucket",
        OutputS3KeyPrefix: prefix,
        Text: `<speak>${sentence.content}</speak>`||'',
        TextType: "ssml",
        VoiceId: "Kevin",
        SampleRate: "22050",
      };
      const output = await pollyClient.send(
        new StartSpeechSynthesisTaskCommand(config)
      );
      
      return output.SynthesisTask?.OutputUri;
    } catch (err) {
      console.log(randomVoiceId);
      console.log("Error putting object", err);
      return '';
    }
  }