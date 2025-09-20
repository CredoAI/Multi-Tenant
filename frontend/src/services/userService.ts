import { ApiClient } from './apiClient';

export class UserService {
  constructor() {}
  async fetchCurrentUser() {
    return await ApiClient('CURRENT_USER');
  }
}
