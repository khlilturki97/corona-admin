import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {toFormData} from '../_globals/funct';

@Injectable({
  providedIn: 'root'
})
export class CrudService {


  constructor(private http: HttpClient) {
  }

  getAll<T>(url) {
    return this.http.get<T>(url);
  }

  getAllPaginate<T>(url, offset, limit, orderBy?, orderByType?) {
    return this.http.get<T>(url + '?offset=' + offset + '&limit=' + limit);
  }

  search<T>(url, key) {
    return this.http.get<T>(url + '/search' + '?key=' + key);
  }

  searchPaginate<T>(url, key, offset, limit) {
    return this.http.get<T>(url + '/search' + '?key=' + key + '&offset=' + offset + '&limit=' + limit);
  }

  getOne<T>(url, id) {
    return this.http.get<T>(url + '/' + id);
  }

  post(url, values, isFormData = false) {
    if (isFormData) {
      return this.http.post(url, toFormData(values));
    }
    return this.http.post(url, values);
  }

  update(url, id, values, isFormData = false) {
    if (isFormData) {
      return this.http.post(url + (id ? '/' + id : ''), toFormData(Object.assign(values, {_method: 'put'})));
    }
    return this.http.put(url + (id ? '/' + id : ''), values);
  }

  delete(url, id) {
    return this.http.delete(url + '/' + id);
  }


}
