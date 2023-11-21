export interface CompanyInterface {
    idCompany: number;
    logo: string | null;
    uuid: string;
    name: string;
    sectorOfActivity: string;
    phoneNumber: string;
    address: string;
    email: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    numberVisitor: number;
    urlRedirection: string;
    numberContact: number;
}

export type ContactType = Pick<CompanyInterface, 'email' | 'phoneNumber' | 'address'>;

