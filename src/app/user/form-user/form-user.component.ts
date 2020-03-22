import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CrudService} from '../../_services/crud.service';
import {ADMIN, BASE_API, DELIVER_MAN} from '../../_globals/vars';
import {UserModel} from '../../_models/user.model';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit, OnChanges {

  userForm: FormGroup;
  userId;
  type;
  userUrl;
  private user: UserModel;

  constructor(private fb: FormBuilder,
              private crud: CrudService,
              private router: Router,
              private route: ActivatedRoute) {
    route.params
      .subscribe(params => {
        this.userId = params.id;
        this.type = params.type;
        this.userUrl = BASE_API;
        if (this.type === 'delivery-man') {
          this.userUrl += DELIVER_MAN
        } else if (this.type === 'admin') {
          this.userUrl += ADMIN
        }
      })
  }

  ngOnInit() {
    this.initUserForm();
    if (this.userId) {
      this.getOneUser()
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit()
  }

  initUserForm() {
    if (!this.userId) {
      this.userForm = this.fb.group({
        first_name: [null, Validators.required],
        last_name: [null, Validators.required],
        phone: [null, Validators.required],
        email: [null, Validators.required],
        password: [null, Validators.required],
        city: [null, Validators.required],
      })
    } else {
      this.userForm = this.fb.group({
        first_name: [this.user ? this.user.first_name : null, Validators.required],
        last_name: [this.user ? this.user.last_name : null, Validators.required],
        phone: [this.user ? this.user.phone : null, Validators.required],
        email: [this.user ? this.user.email : null, Validators.required],
        city: [this.user ? this.user.city : null, Validators.required],
      })
    }
  }

  submitForm() {
    if (!this.userId) {
      this.crud.post(this.userUrl, this.userForm.value)
        .subscribe(data => {
          console.log(data)
          this.router.navigate(['/user/' + this.type])
        })
    } else {
      this.crud.update(this.userUrl, this.userId, this.userForm.value)
        .subscribe(data => {
          console.log(data)
          this.router.navigate(['/user/' + this.type])
        })
    }
  }

  private getOneUser() {
    this.crud.getOne<UserModel>(this.userUrl, this.userId)
      .subscribe(user => {
        this.user = user
        this.initUserForm()
      })
  }
}
