import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private renderer:Renderer2) {
  }

  ngOnInit(): void{
    this.toggleTheme
    this.applyTheme();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.onPreferredColorSchemeChange.bind(this));

    document.addEventListener("scroll", function () {
      const navbar = document.getElementById("navbar") as HTMLElement;
    
      if (window.scrollY > 100) {
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
