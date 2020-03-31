import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CrudService} from '../_services/crud.service';
import {NotyService} from '../_services/noty.service';
import {SEARCH} from '../_globals/vars';
import {HeaderModel} from './models/header.model';
import {CanEditModel} from './models/can-edit.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit, OnChanges {

  /**
   * Array to store elements from back
   */
  elements: any[];

  /**
   * Total number of elements, used in pagination
   */
  nbElements: number;

  /**
   * Current page index, used in pagination
   */
  pageIndex: number;

  /**
   * Array of elements to display after treatment (using fieldsName variable)
   */
  dataToDisplay: any[];

  /**
   * Indicates which key to sort by and in which order
   */
  sortBy: { key: string; value: string };

  /**
   * Indicates if page is loading or not
   */
  loading: boolean;

  /**
   * Fields to search by
   */
  searchFields;

  /**
   * Actual searching key
   */
  searchKey: string;

  /**
   * Actual searching placeholder
   */
  searchPlaceholder: string;

  /**
   * Datatable name
   *
   * Extracted from route
   */
  datatableName: string;

  /**
   * Determine which data is being edited
   */
  editCache: { [key: string]: { edit: boolean; data: any } };

  /**
   * Determine which data is selected
   */
  selectedLine: number;


  // =================================================================================
  // vars used to customize the datatable
  /**
   * Url used to manipulate data
   */
  @Input() url: string;

  /**
   * Define default order of data table
   */
  @Input() defaultSortBy: { key: string; value: string } = {
    key: 'created_at',
    value: 'asc'
  };

  /**
   * Define header fields using HeaderModel structure
   */
  @Input() headers: HeaderModel[];

  /**
   * Define the fields to be displayed in the datatable.
   *
   * If not null, extract data to display from data received from backend
   */
  @Input() fieldsName: string[];

  /**
   * Define if user can edit data
   */
  @Input() canEdit: CanEditModel;

  /**
   * PermissionModel needed to delete an entry
   */
  @Input() deletePermission: string = null;

  /**
   * Define if there is more data to display under datatable
   */
  @Input() hasDetails = false;

  /**
   * Emit selected data
   */
  @Output() selectedData: EventEmitter<any> = new EventEmitter();


  // =================================================================================

  constructor(protected crud: CrudService,
              private router: Router,
              protected notyService: NotyService = null,
              private route: ActivatedRoute = null) {
    this.pageIndex = 1;
    this.searchFields = [];
    this.elements = [];
    this.editCache = {};
    if (this.defaultSortBy) {
      this.sortBy = this.defaultSortBy;
    }
  }

  // getters
  get nbSearchFields() {
    let nb = 0;
    for (const field of Object.keys(this.searchFields)) {
      console.log(field);
      console.log(this.searchFields[field]);
      if (this.searchFields[field] && this.searchFields[field] !== '') {
        nb++;
      }
    }
    return nb;
  }

  get canEditThrowForm() {
    return this.canEdit ?
      (this.canEdit.editWhere === 'form' || this.canEdit.editWhere === 'both') :
      false;
  }

  // =================================================================================
  // construct and initialization

  get canEditThrowDatatable() {
    return this.canEdit ?
      this.canDo(this.canEdit.editPermission) && (this.canEdit.editWhere === 'datatable' || this.canEdit.editWhere === 'both') :
      false;
  }

  ngOnInit() {
    this.getAllPaginate();
    this.updateEditCache();
    this.extractDatatableName();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit()
  }

  // =================================================================================
  // Manipulating data methods

  /**
   * Get data with pagination
   */
  getAllPaginate(offset = 0, limit = 10) {

    let url: string;
    url = this.prepareUrl(offset, limit);

    this.loading = true;
    this.crud.getAll<any>(url)
      .subscribe(data => {
        console.log(data);
        this.elements = data.elements;
        this.nbElements = data.count;
        if (this.fieldsName) {
          this.prepareFieldsToDisplay();
        }
        this.loading = false;

        this.updateEditCache();

      }, () => {
        this.loading = false;
      });

  }

  /**
   * Load data from backend since page changed
   */
  loadData(index: number) {
    this.pageIndex = index;
    this.getAllPaginate((index - 1) * 10);
  }

  /**
   * Sort data
   *
   * Affect to sortBy a new value and call getAllPaginate to re-query data from back
   */
  sort($event: { key: string; value: string }) {
    console.log($event);
    this.sortBy = $event;
    $event.value == null ?
      this.sortBy = this.defaultSortBy :
      ($event.value.includes('asc') ? this.sortBy.value = 'asc' : this.sortBy.value = 'desc');
    // @ts-ignore
    this.getAllPaginate();
    this.pageIndex = 1;
  }

  /**
   * Delete element
   */
  deleteElement(id: any, e: MouseEvent = null) {
    console.log('kneee')
    e.preventDefault();
    e.stopPropagation();
    if (confirm('You sure?')) {
      this.loading = true;
      this.crud.delete(this.url, id)
        .subscribe(() => {
          this.getAllPaginate((this.pageIndex - 1) * 10);
          this.notyService.displaySuccessNotification('Delete');
        });
    }
  }

  search() {
    // @ts-ignore
    this.getAllPaginate();
    this.pageIndex = 1;
  }

  reset(isDate: boolean, field: string = null) {
    let fieldToDelete;
    if (field) {
      fieldToDelete = field;
    } else {
      fieldToDelete = this.searchKey;
    }
    this.searchFields[fieldToDelete] = null;
    if (isDate) {
      delete this.searchFields[fieldToDelete + '_between1'];
      delete this.searchFields[fieldToDelete + '_between2'];
    }
    console.log(this.searchFields);
    // @ts-ignore
    this.getAllPaginate();
    this.pageIndex = 1;
  }


  // =================================================================================
  // searching methods

  setSearch(i: number) {
    this.searchKey = this.headers[i].searchKey;
    this.searchPlaceholder = this.headers[i].title;
  }

  rangeChange($event: Date[]) {
    console.log($event);
    const date1 = $event[0].getFullYear() + '-' + ($event[0].getMonth() + 1) + '-' + $event[0].getDate();
    const date2 = $event[1].getFullYear() + '-' + ($event[1].getMonth() + 1) + '-' + $event[1].getDate();
    this.searchFields[this.searchKey + '_between1'] = date1;
    this.searchFields[this.searchKey + '_between2'] = date2;
    console.log(this.searchFields);
  }

  /**
   * Enable editing in datatable
   */
  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  /**
   * Cancel editing in datatable
   */
  cancelEdit(id: string): void {
    const index = this.elements.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: {...this.elements[index]},
      edit: false
    };
  }


  // =================================================================================
  // editing from datatable methods

  /**
   * Save editing in backend
   */
  saveEdit(id: string): void {
    console.log('save');
    const index = this.elements.findIndex(item => item.id === id);
    // const data = this.editCache[id].data;
    // for (const header of this.headers) {
    //   if (header.isImage) {
    //     delete data[header.searchKey]
    //   }
    // }
    // console.log(data)
    this.loading = true;
    this.crud.update(this.url, id, this.editCache[id].data)
      .subscribe(() => {
        // Object.assign(this.elements[index], this.editCache[id].data);
        // this.elements[index] = this.editCache[id].data;
        this.elements.splice(index, 1, this.editCache[id].data);
        if (this.fieldsName) {
          this.prepareFieldsToDisplay();
        }
        this.editCache[id].edit = false;
        this.notyService.displaySuccessNotification('Update');
        this.loading = false;
      });
  }

  /**
   * Compare old and edited object
   *
   * To know if object changed or not
   */
  compareObjects(id) {
    const index = this.elements.findIndex(item => item.id === id);
    for (const key of Object.keys(this.elements[index])) {
      if (this.editCache[id].data[key] !== this.elements[index][key]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Update edit cache
   */
  updateEditCache(): void {
    if (this.elements) {
      this.elements.forEach(item => {
        this.editCache[item.id] = {
          edit: false,
          data: {...item}
        };
      });
    }
  }

  /**
   * Create update route from actual route
   */
  createUpdateRoute(id) {
    // @ts-ignore
    const routeFragments = this.route._routerState.snapshot.url.split('/');
    // delete routeFragments[routeFragments.length - 1];
    return routeFragments.join('/') + '/form/' + id;
  }

  /**
   * Navigate to
   */
  navigateTo(path) {
    console.log('navigating')
    this.router.navigate([path]);
  }

  // =================================================================================

  diff(a, b, namespace?) {
    namespace = (namespace || '') + '.';
    const keysInA = Object.keys(a);
    const keysInB = Object.keys(b);

    const diffA = keysInA.reduce((changes, key) => {
      const ns = namespace + key;

      if (typeof b[key] === 'undefined') {
        return changes.concat([{type: 'DELETED', id: ns, old: a[key]}]);
      }

      if (typeof a[key] === 'object' && typeof b[key] === 'object') {
        return changes.concat(this.diff(a[key], b[key], ns));
      }

      if (a[key] !== b[key]) {
        return changes.concat([{type: 'CHANGED', id: ns, old: a[key], new: b[key]}]);
      }

      return changes;
    }, []);

    const diffB = keysInB.reduce((changes, key) => {
      const ns = namespace + key;

      if (typeof a[key] === 'undefined') {
        return changes.concat([{type: 'ADDED', id: ns, new: b[key]}]);
      }

      return changes;
    }, []);

    return diffA.concat(diffB);
  }

  canDo(permission) {
    if (!permission) {
      return false;
    }
    return true;
  }

  updateCheckBox(line: number, $event: MouseEvent = null) {
    if ($event) {
      $event.stopPropagation();
    }
    this.selectedLine === line ? this.selectedLine = null : this.selectedLine = line;
    this.selectedLine !== null || this.selectedLine !== undefined ?
      this.selectedData.emit(this.elements[this.selectedLine]) :
      this.selectedData.emit(null);

  }

  /**
   * Prepare fieldsToDisplay array
   *
   * Used when other component call this component
   * Loop over fieldsName array and extracts data to display
   */
  private prepareFieldsToDisplay() {
    this.dataToDisplay = [];
    this.elements.forEach(element => {
      // const dataToDisplay = [];
      console.log(element)
      const result = [];
      for (const field of this.fieldsName) {
        const fieldSplit = field.split('.');
        console.log(field)
        let output = element[fieldSplit[0]];
        for (let i = 1; i < fieldSplit.length; i++) {
          console.log(output)
          console.log(fieldSplit[i]);
          output = output[fieldSplit[i]];
        }
        result.push(output);
      }
      result.push(element.id);
      this.dataToDisplay.push(result);
    });
    console.log(this.dataToDisplay);
  }

  /**
   * Prepare url for get/search request
   *
   * Check if there is fields to search by, if yes add "search/" to the url
   * Add offset and limit
   * If sorting by, add sort by field and order
   * Add fields to search by and value
   */
  private prepareUrl(offset: number, limit: number): string {
    let url: string;
    this.nbSearchFields > 0 ?
      url = this.url.split('?')[0] + SEARCH + (this.url.split('?')[1] ? '?' + this.url.split('?')[1] : '') :
      url = this.url;

    url += (!url.includes('?') ? '?' : '&') + 'offset=' + offset + '&limit=' + limit;

    if (this.sortBy) {
      url += ('&order_by=' + this.sortBy.key + '&order_by_type=' + this.sortBy.value);
    }

    console.log(Object.keys(this.searchFields));
    for (const field of Object.keys(this.searchFields)) {
      console.log(field);
      console.log(this.searchFields[field]);
      if (this.searchFields[field] && this.searchFields[field] !== '') {
        if (this.searchFields[field + '_between1'] && this.searchFields[field + '_between2']) {
          url += ('&' + field + '=' + this.searchFields[field + '_between1']);
          url += ('&' + field + '=' + this.searchFields[field + '_between2']);
        } else {
          url += ('&' + field + '=' + this.searchFields[field]);
        }
      }
    }
    return url;
  }

  /**
   * Extract datatable name from actual route
   */
  private extractDatatableName() {
    if (this.route) {
      // @ts-ignore
      const routeFragments = this.route._routerState.snapshot.url.split('/');
      const index = routeFragments.indexOf('list') - 1;
      this.datatableName = routeFragments[index];
    }
  }
}
