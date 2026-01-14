interface MainWeb {
    hot: number;
    online: number;
    sounding: number;
    total: number;
};

interface Webs {
    id: number;
    name: string;
    hot: number;
    online: number;
    sounding: number;
    total: number;
};

interface Web {
    id_siren: number;
    name: string;
    relay: number;
    signal: number;
    temp: number;
    lat: string | null;
    lng: string | null;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
};

interface Records {
    id_record: number;
    id_siren: number;
    cputemp: number;
    pin18: number;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
};

interface Activities {
    id_activity: number;
    id_siren: number;
    action: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
};

interface Siren {
    id_siren: number;
    name: string;
    relay: number;
    signal: number;
    temp: number;
    lat: string | null;
    lng: string | null;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
    records?: Records[] | [];
    activities?: Activities[] | [];
    last_online: Activities;
    last_on: Activities;
};

interface AllWeb {
    id_web: number;
    name: string;
    sirens: Web[];
};

interface AllUsers {
    id_user: number;
    name: string;
    lastname: string;
    user: string;
    level: number;
    admin: number;
    webs: AllWeb[];
};

interface createUser {
    name: string;
    lastname: string;
    user: string;
};

interface createWeb {
    name: string;
};

interface histories {
    id_history: number;
    action: string;
    id_user?: number;
    id_web?: number;
    id_siren?: number;
    success: number;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
    user: AllUsers;
    siren: Web;
    web: AllWeb;
};

export type {
    AllUsers,
    AllWeb,
    createUser,
    createWeb,
    histories,
    MainWeb,
    Siren,
    Web,
    Webs
};

