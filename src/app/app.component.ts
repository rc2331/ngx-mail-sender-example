import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormControlName,
  EmailValidator,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgxMailSenderService } from 'ngx-mail-sender';
import Notiflix from 'notiflix';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'test';
  sendemailform: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private mail: NgxMailSenderService
  ) {}

  ngOnInit(): void {
    this.sendemailform = this.formBuilder.group({
      to: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      text: ['', Validators.required],
      fromTitle: ['', Validators.required],
    });
  }

  sendEmail(formdata: any) {
    Notiflix.Loading.circle('wait');
    if (this.sendemailform.valid) {
      console.log(this.sendemailform.value);
      this.mail
        .sendMail({
          ...this.sendemailform.value,
          authUser:'<YOUR EMAIL_ID>',
          authPass:'<YOUR_EMAIL_APP_TOKEN>' ,
          host: 'smtp.gmail.com',//YOUR_HOST (this is the default)
        })
        .subscribe(
          (message) => {
            Notiflix.Loading.remove();
            Notiflix.Notify.success('Email Sent Successfully');
            console.log(message);
          },
          (error) => {
            Notiflix.Loading.remove();
            Notiflix.Notify.failure('Email not Sent');
            console.log(error);
          }
        );
    }
  }
}
