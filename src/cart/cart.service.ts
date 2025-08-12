import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { Menu } from 'src/menu/entities/menu.entity';
import { CartMenu } from 'src/cart-menu/entities/cart-menu.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart, 'userDBConnection')
    private cartRepo: Repository<Cart>,
    @InjectRepository(Menu, 'userDBConnection')
    private menuRepo: Repository<Menu>,
    @InjectRepository(CartMenu, 'userDBConnection')
    private cartMenuRepo: Repository<CartMenu>,
  ) {}

  async createCart(
    customerId: string,
    cartMenus: { menuId: number; quantity: number }[] = [],
  ) {
    // 1. 기존 장바구니 찾기
    const existingCart = await this.cartRepo.findOne({
      where: { customerId: customerId },
      relations: ['cartMenus'],
    });

    // 2. 기존 장바구니 삭제 (cascade로 CartMenu도 삭제됨)
    if (existingCart) {
      await this.cartRepo.remove(existingCart);
    }

    const cart = this.cartRepo.create({
      customerId: customerId,
      cartMenus: await Promise.all(
        cartMenus.map(async (cm) => {
          const menu = await this.menuRepo.findOneByOrFail({ id: cm.menuId });
          return this.cartMenuRepo.create({
            menu,
            quantity: cm.quantity,
          });
        }),
      ),
    });

    const result = await this.cartRepo.save(cart);
    // relations 포함해서 다시 조회
    const response = await this.cartRepo.findOne({
      where: { id: result.id },
      relations: ['cartMenus', 'cartMenus.menu'],
    });
    return response;
  }

  async addItem(customerId: string, menuId: number, quantity: number) {
    let cart = await this.getByCustomerId(customerId);

    // 장바구니 없으면 새로 생성
    if (!cart) {
      return this.createCart(customerId, [{ menuId, quantity }]);
    }

    // 해당 메뉴가 이미 있는지 확인
    const existingItem = cart.cartMenus.find((cm) => cm.menu.id === menuId);
    if (existingItem) {
      existingItem.quantity += quantity;
      await this.cartMenuRepo.save(existingItem);
    } else {
      const menu = await this.menuRepo.findOneByOrFail({ id: menuId });
      const newItem = this.cartMenuRepo.create({ cart, menu, quantity });
      await this.cartMenuRepo.save(newItem);
    }

    // 변경된 장바구니 반환
    return this.getByCustomerId(customerId);
  }

  async addMenuToCart(cartId, menuId, quantity, totalPrice) {}

  async getByCartId(cartId: number) {
    return this.cartRepo.findOne({
      where: { id: cartId },
      relations: ['cartMenus', 'cartMenus.menu'],
    });
  }

  async getByCustomerId(customerId: string) {
    const cart = await this.cartRepo.findOne({
      where: { customerId },
      relations: ['cartMenus', 'cartMenus.menu'],
    });
    return cart;
  }

  async getOrCreateByCustomerId(customerId: string) {
    let cart = await this.getByCustomerId(customerId);
    if (!cart) {
      cart = await this.createCart(customerId, []);
    }
    return cart;
  }

  async removeMenuFromCart(cartMenuId: number) {
    return this.cartMenuRepo.delete(cartMenuId);
  }

  async deleteCart(cartId: number) {
    return this.cartRepo.delete(cartId); // cascade 설정 덕분에 cartMenus도 같이 삭제됨
  }
}
