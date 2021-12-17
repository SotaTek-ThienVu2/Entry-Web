import { Status } from "../../common/Status";
export const PaymentMockData = {
    id: 1,
    orderId: 1,
    orderNumber: "gdJgkt9D",
    userID: "12",
    name: "Tai nghe airport",
    category: "Công nghệ",
    image: "https://cdn.tgdd.vn/Products/Images/54/236016/bluetooth-airpods-2-apple-mv7n2-imei-1-org.jpg",
    address: "Hà há ha",
    description: "kkk",
    price: 20000,
    quantity: 2,
    status: Status.CONFIRMED,
    createTimestamp: "2021-12-17T11:34:35.000Z",
    updateTimestamp: "2021-12-17T11:34:35.000Z"
};

export const PaymentListMockData = [
    {
        id: 1,
        orderId: 1,
        orderNumber: "gdJgkt9D",
        userID: "12",
        name: "Tai nghe airport",
        category: "Công nghệ",
        image: "https://cdn.tgdd.vn/Products/Images/54/236016/bluetooth-airpods-2-apple-mv7n2-imei-1-org.jpg",
        address: "Hà há ha",
        description: "kkk",
        price: 20000,
        quantity: 2,
        status: "CONFIRMED",
        createTimestamp: "2021-12-17T11:34:35.000Z",
        updateTimestamp: "2021-12-17T11:34:35.000Z"
    },
    {
        id: 2,
        orderId: 2,
        orderNumber: "EytXoYvC",
        userID: "12",
        name: "ơ kìa ai như cô tấm",
        category: "B",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        address: "H",
        description: "B",
        price: 110,
        quantity: 1,
        status: "CONFIRMED",
        createTimestamp: "2021-12-17T11:51:27.000Z",
        updateTimestamp: "2021-12-17T11:51:27.000Z"
    }
]