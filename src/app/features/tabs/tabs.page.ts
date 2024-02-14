import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  selectedTab: string = 'tab1';

  constructor() { }

  tabChanged(event: any) {
    this.selectedTab = event.tab;
    this.addBounceAnimation();
  }

  addBounceAnimation() {
    const activeTabIcon = document.querySelector(`ion-tab-button[tab='${this.selectedTab}'] ion-icon`);
    if (activeTabIcon) {
      activeTabIcon.classList.add('icon-bounce');
      setTimeout(() => {
        activeTabIcon.classList.remove('icon-bounce');
      }, 300); // Duración de la animación en milisegundos
    }
  }
}
