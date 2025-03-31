import { GithubIssue, GithubStar } from "../../interfaces";

export class GitHubService{
    constructor(){}

    onStar(payload:GithubStar):string{
        let message:string=''
        const {action, sender, repository, starred_at}= payload

        return message= `User ${sender.login} ${action} star on ${repository.full_name}`
       // return message
    }

    onIssue(payload:GithubIssue):string{
        let message: string=''
        const {action, issue} = payload
        
        if(action==='opened')return message = `An issue was opened with this title ${issue.title}`

        if(action==='closed')return message = `An issue was closed by ${issue.user.login}`

        if(action==='reopened')return message = `An issue was re-opened by ${issue.user.login}`
        
        if(action==='deleted')return message = `An issue was deleted for good by ${issue.user.login}`

        return 'Unknown action that happened'
    }
}