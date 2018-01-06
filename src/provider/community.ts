declare var JMessage: any

export class Community {

    register(user) {
        return new Promise((resolve, reject) => {
            JMessage.register(user,
                () => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            )
        });
    }

    login(user) {
        return new Promise((resolv, reject) => {
            JMessage.login(
                user,
                () => {
                    resolv();
                },
                (error) => {
                    reject(error);
                }
            )


        });
    }

    logout() {
        return new Promise((resolv) => {
            JMessage.logout();
            resolv();
        });
    }

    getMyinfo() {
        return new Promise((resolv, reject) => {
            JMessage.getMyInfo(
                (myinfo) => {
                    resolv(myinfo);
                },
                (error) => {
                    reject(error);
                }
            );
        }
        );
    }

    getUserInfo(userid) {

        return new Promise((resolv, reject) => {
            JMessage.getUserInfo(
                userid
                ,
                (userinfo) => {
                    resolv(userinfo);

                },
                (error) => {
                    reject(error);
                }
            )

        });

    }

    updateMyPassword(oldpass, newpass) {

        return new Promise((resolve, reject) => {
            JMessage.updateMyPassword({ oldPwd: oldpass, newPwd: newpass },
                () => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            )
        });
    }


}