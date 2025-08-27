import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { Menu } from 'src/owner-db/entities/Menu';
import { OrderMenu } from 'src/order-menu/entities/order-menu.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order, 'userDBConnection')
    private orderRepo: Repository<Order>,
    @InjectRepository(Menu, 'ownerDBConnection')
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

      console.log('menu', menu);
      const orderMenu = this.orderMenuRepo.create({
        order,
        menuId: menu.id,
        quantity: item.quantity,
        totalPrice: Number(menu.price) * item.quantity,
      });
      console.log('orderMenu', orderMenu);

      orderMenus.push(orderMenu);
    }

    await this.orderMenuRepo.save(orderMenus);

    const resultOrder = await this.orderRepo.findOne({
      where: { id: order.id },
      relations: ['orderMenus'],
    });
    if (!resultOrder) return null;

    // 2️⃣ 메뉴 IDs 추출 (ownerDB)
    const menuIds = resultOrder.orderMenus.map((om) => om.menuId);

    // 3️⃣ ownerDB에서 메뉴 조회
    const menus = await this.menuRepo.find({
      where: { id: In(menuIds) },
    });

    // 4️⃣ orderMenus에 메뉴 매핑
    resultOrder.orderMenus.forEach((om) => {
      om['menu'] = menus.find((m) => m.id === om.menuId);
    });

    return resultOrder;
  }
  ///////////////////////////////////////////////////////////////
  async getMenuByCondition(
    condition: string,
    value: any,
  ): Promise<Order[] | null> {
    const resultOrders = await this.orderRepo.find({
      where: { [condition]: value },
      relations: ['orderMenus'],
    });
    if (!resultOrders.length) return null;

    // 2️⃣ 모든 메뉴 IDs 추출
    const menuIds = resultOrders.flatMap((o) =>
      o.orderMenus.map((om) => om.menuId),
    );

    // 3️⃣ ownerDB에서 메뉴 조회
    const menus = await this.menuRepo.find({
      where: { id: In(menuIds) },
    });

    // 4️⃣ 각 orderMenus에 메뉴 매핑
    resultOrders.forEach((order) => {
      order.orderMenus.forEach((om) => {
        om['menu'] = menus.find((m) => m.id === om.menuId);
      });
    });

    console.log('resultOrders', resultOrders);
    return resultOrders;
  }

  async findAll(customerId): Promise<any[] | null> {
    // return this.orderRepo.find({
    //   where: { customerId: customerId },
    //   relations: ['orderMenus'],
    //   order: { id: 'DESC' },
    // });
    const result = await this.getMenuByCondition('customerId', customerId);
    if (!result) return null;

    //@ts-ignore
    return result;
  }

  async findByStore(storeId): Promise<Order[] | null> {
    // return this.orderRepo.find({
    //   where: { storeId: storeId },
    //   relations: ['orderMenus'],
    //   order: { id: 'DESC' },
    // });

    const result = await this.getMenuByCondition('storeId', storeId);
    if (!result) return null;

    //@ts-ignore
    return result;
  }

  async findOne(id: number): Promise<Order | null> {
    // const order = await this.orderRepo.findOne({
    //   where: { id },
    //   relations: ['orderMenus'],
    // });
    // if (!order) throw new NotFoundException('Order not found');
    const result = await this.getMenuByCondition('id', id);
    if (!result) return null;

    //@ts-ignore
    return result;
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
