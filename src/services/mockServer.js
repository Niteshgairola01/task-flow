let userDB = [];

export const mockRegister = (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userExists = userDB.some(user => user?.email === data?.email);

            if (userExists) {
                return reject({
                    status: 400,
                    message: `User with ${data?.email} aleady exists`
                });
            }

            const newUser = { id: Date.now(), ...data };
            userDB.push(newUser);

            resolve({
                status: 201,
                data: {
                    user: newUser,
                    accessToken: `access_token_${Date.now()}`,
                    refreshToken: `refresh_token_${Date.now()}`,
                    message: 'User registered successfully'
                },
            });
        }, 1000);
    })
};

export const mockLogin = (data) => {
    return new Promise((resolve, reject) => {
        const user = userDB.find(user => user?.email === data?.email);

        if (!user) {
            return reject({
                status: 404,
                messgae: `No user found with ${data?.email}`
            });
        }

        if (user?.password !== data?.password) {
            return reject({
                status: 401,
                message: 'Invalid password credentials'
            });
        }

        resolve({
            status: 200,
            data: {
                user,
                accessToken: `access_token_${Date.now()}`,
                refreshToken: `refresh_token_${Date.now()}`,
            }
        });
    })
}