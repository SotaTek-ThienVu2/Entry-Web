import { OrderStatus } from '../../common/enum/status.enum';
import { CreateOrderDto } from '../dto/create-order.dto'
export const OrderMockData = {
  id: 9,
  orderNumber: '5x5sjP3m',
  userID: '12',
  name: 'Bánh tráng nướng',
  category: 'Đồ ăn',
  image: 'https://yummyday.vn/uploads/images/cach-lam-banh-trang-nuong-6.jpg',
  address: 'Nhà ăn sinh viên Bách Khoa',
  description: 'Ăn ngon thì vl',
  price: 25000,
  quantity: 15,
  status: OrderStatus.DELIVERED,
  createTimestamp: new Date("2021-12-15T10:01:01.000Z"),
  updateTimestamp: new Date("2021-12-15T10:11:54.000Z")
};

export const OrderListMockData = [
  {
    id: 9,
    orderNumber: '5x5sjP3m',
    userID: '12',
    name: 'Bánh tráng nướng',
    category: 'Đồ ăn',
    image: 'https://yummyday.vn/uploads/images/cach-lam-banh-trang-nuong-6.jpg',
    address: 'Nhà ăn sinh viên Bách Khoa',
    description: 'Ăn ngon thì vl',
    price: 25000,
    quantity: 15,
    status: OrderStatus.CANCELLED,
    createTimestamp: "2021-12-15T10:01:01.000Z",
    updateTimestamp: "2021-12-15T10:01:01.000Z",
  },
  {
    id: 8,
    orderNumber: 'qKM99EgW',
    userID: '12',
    name: 'Bánh xe',
    category: 'thời trang nam',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    address: 'Hà Nội',
    description: 'Hàng dởm',
    price: 110,
    quantity: 1,
    status: OrderStatus.CANCELLED,
    createTimestamp: "2021-12-15T10:01:01.000Z",
    updateTimestamp: "2021-12-15T10:01:01.000Z",
  },
  {
    id: 7,
    orderNumber: 'Z9JNHkpM',
    userID: '12',
    name: 'Bánh xe',
    category: 'thời trang nam',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    address: 'Hà Nội',
    description: 'Hàng dởm',
    price: 110,
    quantity: 1,
    status: OrderStatus.CANCELLED,
    createTimestamp: "2021-12-15T10:01:01.000Z",
    updateTimestamp: "2021-12-15T10:01:01.000Z",
  },
];

export const CreateOrderMockDto : CreateOrderDto = {
    name: "Bánh xe",
    price: 109.5,
    address: "Hà Nội",
    quantity: 1,
    description: "Hàng dởm",
    category: "thời trang nam",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
};
