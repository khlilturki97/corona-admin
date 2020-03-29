import {environment} from '../../environments/environment';

// export const BASE_URL = ;
// export const BASE_URL = 'http://localhost:8000';

export const BASE_URL = environment.baseUrl;
export const BASE_API = BASE_URL + '/api';
export const SEARCH = '/search';
export const ORDER = '/order';
export const PASSED = '/passed';
export const CONFIRMED = '/confirmed';
export const SHIPPING = '/shipping';
export const SHIPPED = '/shipped';
export const CANCELED = '/canceled';
export const DELIVER_MAN = '/delivery-man';
export const ADMIN = '/admin';
export const CLIENT = '/client';
export const CATEGORY = '/category';
export const PRODUCT = '/product';
export const NOT_ASSIGNED = '/not-assigned';
export const LOGIN = '/auth/login ';
export const RESET = 'password/create';
export const FIND = 'password/find';
export const NEW_PASSWORD = 'password/reset';
export const CURRENT_USER = '/auth/user';
export const CLAIM = '/claim';

