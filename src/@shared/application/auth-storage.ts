/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { AsyncLocalStorage } from 'async_hooks';
import { User } from '../../user/domain/entities/user.entity';

export type Auth = {
  user?: User;
};

export const AuthStorage = {
  storage: new AsyncLocalStorage<Auth>(),
  get(): Auth {
    return this.storage.getStore();
  },

  set(payload: Auth) {
    return this.storage.enterWith(payload);
  },
};
