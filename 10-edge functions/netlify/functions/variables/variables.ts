import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const variable=process.env.VARIABLE

    if(!variable){
        throw new Error('variable inexistente')
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            variable
        }),
        headers:{
            'Content-Type':'application/json'
        }
    }
}

export { handler }