export interface Challenge {
    id: number;
    title: string;
    description: string;
    createdBy: string;
    creationDate: Date;
    vote: number,
    feature: string;
};

export interface UserData {
    name: string;
    email: string;
    role: string;
}
  