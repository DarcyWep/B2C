export class cart {
    cartId: number;
    cartChecked: boolean;
    productImg: string;
    productName: string;
    productPrice: number;
    cartQuantity: number;
    cartTotalPrice: string;
}

export class order{
    id: number;
    No: string;
    createTime: string;
    totalPrice: string;
    status: number;
    endTime: string;

    // 前端所有
    statusString: string;
}