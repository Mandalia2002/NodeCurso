import { Request, Response } from "express";
import { GitHubService } from "../services/github-service";
import { DiscordService } from "../services/discord-service";

export class GithubController{
    constructor(
        private readonly GithubS = new GitHubService(),
        private readonly discordS = new DiscordService()
    ){}

    webHookHandler = (req: Request, res:Response)=>{
        const event= req.header('x-github-event')?? 'unknown'
        // const signature= req.header('x-hub-signature-256')?? 'unknown'
        const payload = req.body
        let message:string

        switch(event){
            case 'star':
                message=this.GithubS.onStar(payload)
            break;
            case 'issues':
                message=this.GithubS.onIssue(payload)
            break;
            default:
                message= `Unknown event ${event}`
        }

        // this.discordS.notify(message)
        //     .then(()=>res.status(202).send('Accepted'))
        //     .catch(()=>res.status(500).json({error:'Internal server error'}))

        console.log(message)

        res.status(202).send('Accepted')
    }
}