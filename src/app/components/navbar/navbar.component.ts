import { Component, Renderer2 } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private http:HttpClient,private locationService:LocationService,private renderer:Renderer2) {
    this.getCityAndState();
  }

  ipAddress:string = '';

  getIPAddress(){
    this.http.get("https://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
    });
  }

  state = '';
  city = '';

  getCityAndState(){
    this.getIPAddress();

    this.locationService.getCityAndState(this.ipAddress).pipe(
      tap(res=>{
        this.state = res.region;
        this.city = res.city;
      })
    ).subscribe();

  }

  ngOnInit(): void{
    this.toggleTheme
    this.applyTheme();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.onPreferredColorSchemeChange.bind(this));

    document.addEventListener("scroll", function () {
      const navbar = document.getElementById("navbar") as HTMLElement;
    
      if (window.scrollY > 60) {
        navbar.classList.remove('solid');
      } else {
        navbar.classList.add('solid');
      }
    });
  }



  onPreferredColorSchemeChange(event: MediaQueryListEvent): void {
    const newColorScheme = event.matches ? 'dark' : 'light';
    
    const html = document.getElementsByTagName('html')[0];

    if (newColorScheme === 'dark') {
      this.renderer.removeClass(html, 'theme-light');
      this.renderer.addClass(html, 'theme-dark');
    } else {
      this.renderer.removeClass(html, 'theme-dark');
      this.renderer.addClass(html, 'theme-light');
    }
  }

  toggleTheme(): void {
    const html = document.getElementsByTagName('html')[0];
    const isDarkTheme = html.classList.contains('theme-dark');
    this.renderer.removeClass(html, isDarkTheme ? 'theme-dark' : 'theme-light');
    this.renderer.addClass(html, isDarkTheme ? 'theme-light' : 'theme-dark');
  }

  applyTheme(): void {
    const preferredTheme = localStorage.getItem('theme');
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDarkTheme = preferredTheme === 'theme-dark' || (!preferredTheme && userPrefersDark);

    const html = document.getElementsByTagName('html')[0];
    this.renderer.addClass(html, isDarkTheme ? 'theme-dark' : 'theme-light');
  }
}
