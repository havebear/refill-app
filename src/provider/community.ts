declare var JMessage: any

export class Community
{

    register(user)
    {
       return new Promise((resolve,reject)=>{
           JMessage.register(user,
        ()=>{
            resolve();
        },
        (error)=>{
            reject(error);
        }
        )
       });
    }

    login(user)
    {
        return new Promise((resolv,reject)=>{
            JMessage.login(
                user,
                () =>{
                resolv();
                },
                (error) =>
                {
                    reject(error);
                }
            )


        });
    }



}