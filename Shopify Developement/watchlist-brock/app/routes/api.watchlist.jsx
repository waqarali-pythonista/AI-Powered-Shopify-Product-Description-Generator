import { json } from "@remix-run/node";

export async function loader(){

    return json({

        ok:true, 
        message:" I am Waqar aPI "
    });
}