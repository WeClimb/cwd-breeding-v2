export interface requestUpdateProduct {
    name: string;
    description: string;
    centPrice: number;
    deerId: string;
    ranchId: string;
    active: boolean;
    stripeProductId: string;
}
