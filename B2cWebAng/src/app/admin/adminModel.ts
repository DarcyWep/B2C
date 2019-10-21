export class record {
    id:number;
    loginTime:string;
    adminId:number;
    adminEmail:string;
    ip:string;
    operation:string;
}

export class user {
    id: number;
    email: string;
    createTime: string;
    status: number;

    /*前端特有 */
    statusString: string;
}

export class product{
    id: number;
    name: string;
    mainImg: any;
    price: string;
    stock: string;
    category: string;
    createTime: string;
    updateTime: string;
}


export class order {
    id: number;
    No: string;
    totalMoney: string;
    createTime: string;
    endTime: string;
    status: number;
    userEmail: string;

    // 前端
    statusString: string;
}



