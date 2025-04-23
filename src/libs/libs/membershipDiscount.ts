export function membershipDiscount(
    membershipTier: string
){
    let discount = 0;
    switch (membershipTier) {
        case 'bronze':
            discount = 3; 
            break;
        case 'silver':
            discount = 5; 
            break;
        case 'gold':
            discount = 10; 
            break;
        case 'platinum':
            discount = 15; 
            break;
        case 'diamond':
            discount = 20; 
            break;
        default:
            discount = 0; 
    }
    return discount;
}
