import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MobileDropdownNavComponent } from "../mobile-dropdown-nav/mobile-dropdown-nav.component";

@Component({
    selector: 'app-navbar-2',
    standalone: true,
    templateUrl: './navbar-2.component.html',
    styleUrl: './navbar-2.component.css',
    imports: [CommonModule, RouterLink, MobileDropdownNavComponent]
})
export class Navbar2Component implements OnInit {
  protected searchTerm: string = '';


  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  dropdownMenu = false;

  ngOnInit(): void {}

  search(): void {
    if (this.searchTerm !== '') {
      const shopIsActive = this.activatedRoute.snapshot.routeConfig?.path;

      if (shopIsActive) {
           this.router.navigate([], {
             queryParams: { search: this.searchTerm },
             queryParamsHandling: 'merge',
           });
      } else {
           this.router.navigate(['/shop'], {
             queryParams: { search: this.searchTerm },
           });
      }

    }
  }

  showDropdown() {
    this.dropdownMenu = !this.dropdownMenu
  }
}
