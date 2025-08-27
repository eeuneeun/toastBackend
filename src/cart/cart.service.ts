import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { In, Repository } from 'typeorm';
import { CartMenu } from 'src/cart-menu/entities/cart-menu.entity';
import { Menu } from 'src/owner-db/entities/Menu';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart, 'userDBConnection')
    private cartRepo: Repository<Cart>,
    @InjectRepository(Menu, 'ownerDBConnection')
    private readonly menuRepo: Repository<Menu>,
    @InjectRepository(CartMenu, 'userDBConnection')
    private cartMenuRepo: Repository<CartMenu>,
  ) {}
  async createCart(
    customerId: string,
    cartMenus: { menuId: number; quantity: number }[] = [],
  ) {
    // 1. 기존 장바구니 찾기
    const existingCart = await this.cartRepo.findOne({
      where: { customerId },
      relations: ['cartMenus'],
    });

    // 2. 기존 장바구니 삭제
    if (existingCart) {
      await this.cartRepo.remove(existingCart);
    }

    // 3. CartMenu 생성 (Menu는 다른 DB에서 존재하는지 체크)
    const cartMenuEntities = await Promise.all(
      cartMenus.map(async (cm) => {
        const menu = await this.menuRepo.findOne({ where: { id: cm.menuId } });
        if (!menu) throw new NotFoundException(`Menu ${cm.menuId} not found`);

        return this.cartMenuRepo.create({
          menuId: menu.id,
          quantity: cm.quantity,
        });
      }),
    );

    // 4. Cart 생성
    const cart = this.cartRepo.create({
      customerId,
      cartMenus: cartMenuEntities,
    });

    const result = await this.cartRepo.save(cart);
    console.log(result);

    const response = await this.getCartByCustomerId(customerId);
    return response;
  }

  async addItem(customerId: string, menuId: number, quantity: number) {
    let cart = await this.getCartByCustomerId(customerId);

    // 장바구니 없으면 새로 생성
    if (!cart) {
      return this.createCart(customerId, [{ menuId, quantity }]);
    }

    // 해당 메뉴가 이미 있는지 확인
    const existingItem = cart.cartMenus.find((cm) => cm.menuId === menuId);
    if (existingItem) {
      existingItem.quantity += quantity;
      await this.cartMenuRepo.save(existingItem);
    } else {
      const menu = await this.menuRepo.findOneByOrFail({ id: menuId });
      const newItem = this.cartMenuRepo.create({
        cart,
        menuId: menu.id,
        quantity,
      });
      await this.cartMenuRepo.save(newItem);
    }

    // 변경된 장바구니 반환
    return this.getCartByCustomerId(customerId);
  }

  async addMenuToCart(cartId, menuId, quantity, totalPrice) {}

  async getByCartId(cartId: number) {
    // return this.cartRepo.findOne({
    //   where: { id: cartId },
    //   relations: ['cartMenus', 'cartMenus.menu'],
    // });
    // 1. Cart + CartMenu 조회
    const cart = await this.cartRepo
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.cartMenus', 'cartMenu')
      .where('cart.id = :id', { id: cartId })
      .getOne();

    if (!cart) return null;

    // 2. Menu Id 배열 추출
    const menuIds = cart.cartMenus.map((cm) => cm.menuId);

    // 3. 다른 DB에서 Menu 조회
    const menus = await this.menuRepo.findBy({ id: In(menuIds) });

    // 4. CartMenu에 메뉴 매핑
    cart.cartMenus.forEach((cm) => {
      cm['menu'] = menus.find((m) => m.id === cm.menuId);
    });

    return cart;
  }

  /**
   * 고객ID로 Cart 조회 + CartMenu + Menu 매핑
   */
  async getCartByCustomerId(customerId: string): Promise<Cart | null> {
    // 1️⃣ Cart + CartMenu 조회 (userDB)
    const cart = await this.cartRepo.findOne({
      where: { customerId },
      relations: ['cartMenus'],
    });
    if (!cart) return null;

    // 2️⃣ 메뉴 IDs 추출 (ownerDB)
    const menuIds = cart.cartMenus.map((cm) => cm.menuId);

    // 3️⃣ ownerDB에서 메뉴 조회
    const menus = await this.menuRepo.find({
      where: { id: In(menuIds) },
    });

    // 4️⃣ cartMenus에 메뉴 매핑
    cart.cartMenus.forEach((cm) => {
      cm['menu'] = menus.find((m) => m.id === cm.menuId);
    });

    return cart;
  }

  async getOrCreateByCustomerId(customerId: string) {
    let cart = await this.cartRepo.findOne({ where: { customerId } });

    if (!cart) {
      cart = this.cartRepo.create({ customerId });
      await this.cartRepo.save(cart);
    }

    // Cart + CartMenu + Menu 조회
    return this.getCartByCustomerId(customerId);
  }

  async updateMenuQuantity(cartId: number, menuId: number, quantity: number) {
    const cartMenu = await this.cartMenuRepo.findOne({
      where: {
        cart: { id: cartId },
        menuId: menuId,
      },
      relations: ['cart', 'menu'],
    });
    if (!cartMenu) {
      throw new NotFoundException('CartMenu not found');
    }

    cartMenu.quantity = quantity;
    await this.cartMenuRepo.save(cartMenu);
    return cartMenu;
  }

  async removeMenuFromCart(cartMenuId: number) {
    return this.cartMenuRepo.delete(cartMenuId);
  }

  async deleteCart(cartId: number) {
    return this.cartRepo.delete(cartId); // cascade 설정 덕분에 cartMenus도 같이 삭제됨
  }
}
