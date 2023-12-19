import { Component, Renderer2 } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private http: HttpClient, private locationService: LocationService, private renderer: Renderer2) {
    this.getCityAndState();
  }


  state = '';
  city = '';
  country = '';

  getCityAndState() {

    this.locationService.connectWebSocket();

    this.http.get("http://api.ipify.org/?format=json").subscribe((res: any) => {

      this.locationService.sendIp(res.ip);
    });

    this.locationService.fetchMessage().pipe(
      map(res => {
        const locationElement = document.getElementById('location-info');

        if (locationElement == null) {
          return;
        }
        this.state = res.Region;
        this.city = res.City;
        const flagEmoji = this.countryPrefixToFlagEmoji(res.Country);
        this.country = flagEmoji;

        // Remueve la clase de animación
        locationElement.classList.remove("location-info");

        // Trigger reflow para reiniciar la animación
        void locationElement.offsetWidth;

        // Vuelve a agregar la clase después de un breve retraso
        setTimeout(function () {
          locationElement.classList.add("location-info");
        },0);


      }),
      catchError(err => {
        console.error(err);
        throw err;
      })
    ).subscribe();


  }

  countryPrefixToFlagEmoji(prefix: string) {
    const offset = 127397;

    const emoji = prefix
      .toUpperCase()
      .split('')
      .map(char => String.fromCodePoint(char.charCodeAt(0) + offset))
      .join('');

    return emoji;

  }


  ngOnInit(): void {
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
