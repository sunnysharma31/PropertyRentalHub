export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    userType: string
}

export const usersList = [
    {
        id: 111,
        name: 'owner1',
        email: 'owner1@renthub.com',
        password: '12345',
        userType: 'Owner'
    },
    {
        id: 112,
        name: 'renter1',
        email: 'renter1@renthub.com',
        password: '12345',
        userType: 'Renter'
    }
]