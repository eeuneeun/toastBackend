import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Orders } from 'src/owner-db/entities/Orders';
import { Repository } from 'typeorm';
import { Menu } from 'src/menu/entities/menu.entity';
import { OrderMenu } from 'src/order-menu/entities/order-menu.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders, 'ownerDBConnection')
    private ownerOrderRepo: Repository<Order>,
    @InjectRepository(Order, 'userDBConnection')
    private orderRepo: Repository<Order>,
    @InjectRepository(Menu, 'userDBConnection')
    private menuRepo: Repository<Menu>,
    @InjectRepository(OrderMenu, 'userDBConnection')
    private orderMenuRepo: Repository<OrderMenu>,
  ) {}

  // ★ 주문 생성
  // 1. database.user > order insert
  // 2. database.owner > order insert
  // 3. 두 데이터 베이스 양방향 동기화 처리
  async create(dto: CreateOrderDto): Promise<Order | null> {
    const order = await this.orderRepo.create({
      storeId: dto.paymentInfo.storeId,
      totalPrice: dto.paymentInfo.totalPrice,
      paymentMethod: dto.paymentInfo.paymentMethod,

      customerId: dto.paymentInfo.customerId,
      customerName: dto.paymentInfo.customerName,
      customerPhone: dto.paymentInfo.customerPhone,
      deliveryMethod: dto.paymentInfo.deliveryMethod,
      deliveryAddress: dto.paymentInfo.deliveryAddress,

      status: dto.paymentInfo.status,
    });
    await this.orderRepo.save(order);

    // const ownerOrder = this.ownerOrderRepo.create({
    //   customerId: dto.customerId,
    //   storeId: dto.storeId,
    //   totalPrice: dto.totalPrice,
    // });

    // await this.ownerOrderRepo.save(ownerOrder);

    const orderMenus: OrderMenu[] = [];

    for (const item of dto.cartMenus) {
      const menu = await this.menuRepo.findOne({ where: { id: item.menuId } });
      if (!menu) throw new NotFoundException(`Menu ${item.menuId} not found`);

      const orderMenu = this.orderMenuRepo.create({
        order,
        menu,
        quantity: item.quantity,
        totalPrice: menu.price * item.quantity,
      });

      orderMenus.push(orderMenu);
    }

    await this.orderMenuRepo.save(orderMenus);

    return this.orderRepo.findOne({
      where: { id: order.id },
      relations: ['orderMenus', 'orderMenus.menu'],
    });
  }

  async findAll(customerId): Promise<Order[]> {
    return this.orderRepo.find({
      where: { customerId: customerId },
      relations: ['orderMenus', 'orderMenus.menu'],
      order: { id: 'DESC' },
    });
  }

  async findByStore(storeId): Promise<Order[]> {
    return this.orderRepo.find({
      where: { storeId: storeId },
      relations: ['orderMenus', 'orderMenus.menu'],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['orderMenus', 'orderMenus.menu'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    order.status = updateOrderDto.status;
    return this.orderRepo.save(order);
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
