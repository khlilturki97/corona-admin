import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';
declare var $: any;
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  error = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/order/list']);
    }
  }

  ngOnInit(): void {
    this.initJQScript();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/order/passed';
  }
  initJQScript() {
    $('.navbar-toggler').on('click', function() {
      $('html').toggleClass('nav-open');
    });
    $('.form-control').on('focus', function() {
      $(this).parent('.input-group').addClass('input-group-focus');
    }).on('blur', function() {
      $(this).parent('.input-group').removeClass('input-group-focus');
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmitLoginForm() {
    this.submitted = true;

    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log('success , logging in . . .');
          console.log(data);
          this.router.navigate([this.returnUrl]).then(
            () => {
              window.location.reload();
            });
        },
        error => {
          console.log('error on sign  in');
          console.log(error);
          this.f.password.reset();
          this.error = true;
        }, () => {
          this.error = false;
          this.submitted = false;
        });
  }
}
