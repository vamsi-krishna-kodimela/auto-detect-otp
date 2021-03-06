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
      window.addEventListener('DOMContentLoaded', async (e) => {
        const ac = new AbortController();
        setTimeout(() => {
          ac.abort();
        }, 1 * 60 * 1000);
        let options = {
          otp: { transport: ['sms'] },
          signal: ac.signal,
          password: true,
          abort: ac,
        };
        alert('Reached Here');
        this.data = 'step1';
        if(navigator.credentials){
          this.data='step2'
        }else{
          this.data="failed";
        }
        try{
             await navigator.credentials
          .get(options)
          .then((otp) => {
            this.data = JSON.stringify(otp);
            alert(this.data);
          })
          .catch((err) => {
            console.log(err);
            this.data = err.message;
          });
        }catch{
          this.data="errrrrr";
        }
     
      });
    } else {
      alert('WebOTP not supported!.');
      this.data = 'WebOTP not supported';
    }
  }
}
