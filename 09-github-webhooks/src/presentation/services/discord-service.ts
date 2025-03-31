import { Envs } from "../../config/envs"

export class DiscordService{
    private readonly discordWebHook= Envs.Discord_webhook_url

    constructor(){}

    async notify(message:string){
        const body={
            content: message,
            embeds: [
                {
                    image: {/*imagen link*/}
                }
            ]
        }
        const resp=await fetch(this.discordWebHook, {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        })

        if(!resp.ok){
            console.log('Error sending message to Discord')
            return false
        }

        return true;
    }
}