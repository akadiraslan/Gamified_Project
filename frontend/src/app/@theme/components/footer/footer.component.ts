
import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b>
      <a href="http://cse.eng.marmara.edu.tr/en" target="_blank">Marmara</a></b> {{ currentYear }}</span>
    <span class="created-by">   </span>
    <div class="socials">
      <a href="#" target="_blank" class="ion ion-social-facebook"></a>
      <a href="#" target="_blank" class="ion ion-social-twitter"></a>
      <a href="#" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
  get currentYear(): number {
    return new Date().getFullYear();
  }
}
