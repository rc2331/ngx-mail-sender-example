
# ngx-mail-sender

## Purpose
ngx-mail-sender is an Angular library designed to simplify the process of sending emails from Angular applications. It provides a service that abstracts the complexity of making HTTP requests to an email sending API, allowing developers to focus on the application logic rather than the intricacies of email delivery.

## Features
Simplicity: Easily integrate email sending functionality into your Angular applications.
Flexibility: Supports dynamic email content and configuration.
Error Handling: Built-in error handling for robust email sending operations.
Installation
To install ngx-mail-sender, run the following command in your Angular project:
```console
npm install ngx-mail-sender
```
### Usage
Importing the Library
First, import NgxMailSenderModule into your Angular module:
```js
import { NgxMailSenderModule } from 'ngx-mail-sender';
```
```js
@NgModule({
 imports: [
    // other imports
    NgxMailSenderModule
 ],
 // declarations, providers, etc.
})
export class AppModule { }
```
Using the Service
Inject NgxMailSenderService into your component and use it to send emails:
```js
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxMailSenderService } from 'ngx-mail-sender';

@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 title = 'test';
 sendemailform: FormGroup;

 constructor(private formBuilder: FormBuilder, private mail: NgxMailSenderService) { }

 ngOnInit(): void {
    this.sendemailform = this.formBuilder.group({
      to: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      text: ['', Validators.required],
      host: ['', Validators.required],
      authUser: ['', [Validators.required, Validators.email]],
      authPass: ['', Validators.required],
      fromTitle: ['', Validators.required],
    });
 }

 sendEmail() {
    if (this.sendemailform.valid) {
      this.mail.sendMail(this.sendemailform.value).subscribe(
        (message) => {
          console.log(message);
        },
        (error) => {
          console.log(error);
        }
      );
    }
 }
}
```
Example
Here's a simple example of how to use ngx-mail-sender in an Angular component:

1. Create a Form: Use Angular's reactive forms to create a form for email details.
Inject NgxMailSenderService: Inject the service into your component.
2. Send Email: Call the sendMail method of NgxMailSenderService with the form data to send an email.
Methods
sendMail(emailData: any): Observable<any>
Sends an email using the provided email data.
3. Parameters:
emailData (any): An object containing the email details.
Returns: An Observable that resolves with the response from the email sending API.
### Benefits
- Ease of Use: Simplifies the process of sending emails from Angular applications.
- Flexibility: Allows for dynamic email content and configuration.
- Error Handling: Provides built-in error handling for robust email sending operations.
### Conclusion
ngx-mail-sender is a powerful tool for Angular developers looking to integrate email sending functionality into their applications. With its simple API and robust error handling, it's an excellent choice for any project that requires email communication.


### Angular 17 Usage Example 

	
	//component.ts file

    sendemailform: FormGroup | any
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
              authUser: <YOUR_EMAIL_ID>,
              authPass: <YOUR_EMAIL_APP_TOKEN>,
              host: <YOUR_MAIL_HOST>, //default: 'smtp.gmail.com'
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

import { ApplicationConfig } from  '@angular/core';

import { provideRouter } from  '@angular/router';

  
//app.config.ts

    import { routes } from  './app.routes';
    import { NgxMailSenderService } from  'ngx-mail-sender';
    import { HttpClient, HttpClientModule, provideHttpClient } from  '@angular/common/http';
      
    export  const  appConfig: ApplicationConfig = {
    
    providers: [provideRouter(routes),provideHttpClient()]
    
    };
