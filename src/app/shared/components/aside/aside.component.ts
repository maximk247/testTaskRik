import { Component } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {
  public isMenuOpen = true;

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
