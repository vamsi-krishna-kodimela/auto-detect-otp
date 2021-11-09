import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'auto-detect-otp';
  data = '';
  ngOnInit() {}
  ngAfterViewInit() {
    if ('OTPCredential' in window) {
      window.addEventListener('DOMContentLoaded', (e) => {
        const ac = new AbortController();
        let options = {
          otp: { transport: ['sms'] },
          signal: ac.signal,
        };
        navigator.credentials
          .get(options)
          .then((otp) => {
            this.data = JSON.stringify(otp);
            alert(this.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      alert('WebOTP not supported!.');
    }
  }
}
