interface Login {
    user: string;
    pass: string;
};

interface User {
    id_user: number;
    name: string;
    lastname: string;
    user: string;
    level: number;
};

interface Change {
    newpass: string;
    confpass: string;
};

export type {
    Change,
    Login,
    User
};

