import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Tralalero tralala',
        }),
        headers:{
            'Content-Type':'application/json'
        }
    }
}

export { handler }