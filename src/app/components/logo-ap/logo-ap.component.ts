import { Component, OnInit, Renderer2, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-logo-ap',
  templateUrl: './logo-ap.component.html',
  styleUrls: ['./logo-ap.component.css']
})
export class LogoAPComponent implements OnInit {
  isLogged = false;
  authService: any;

  constructor(private router:Router, private tokenService: TokenService, private renderer: Renderer2,private elementRef: ElementRef) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged=true;
    }else{
      this.isLogged = false;
    }

    this.renderer.listen('window', 'click', (e: Event) => {
      const targetElement = e.target as HTMLElement;
      if (!this.elementRef.nativeElement.contains(targetElement)) {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
  
        if (navbarToggler && navbarCollapse) {
          const isNavbarToggler = navbarToggler.contains(targetElement);
          const isNavbarCollapse = navbarCollapse.contains(targetElement);
  
          if (!isNavbarToggler && !isNavbarCollapse) {
            navbarCollapse.classList.remove('show');
          }
        }
      }
    });
  }

  onLogOut():void{
    
    this.tokenService.logOut();
    window.location.reload();
  }

  login(){
    this.router.navigate(['/login']);
  }

  
}