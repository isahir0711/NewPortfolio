import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { CardInfo } from '../../../DTOS/cardDTO';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor() {
     
  }
  
  ngOnInit():void{    
    const observer = new IntersectionObserver((entries) =>{
      entries.forEach((entry)=>{
        entry.target.classList.toggle('show-animate', entry.isIntersecting);
      });
    });
  
    const articles = document.querySelectorAll('.hidden-content');
    console.log(articles);
    articles.forEach((element) => observer.observe(element)); 
  }

  experience:CardInfo[] = [
    {title:'Avents',
    description:'Developed a web applicaciont to organize events and appointments, with a subscription functionality',
    cardIcons:['/assets/imgs/icons/net-icon.svg',
    '/assets/imgs/icons/csharp-icon.svg',
    '/assets/imgs/icons/azure-icon.svg',
    '/assets/imgs/icons/msql-icon.svg',
    '/assets/imgs/icons/html-icon.svg',
    '/assets/imgs/icons/css-icon.svg',],
    subtitle:'June 2021 - December 2023',
    url:'https://www.avents.co',
    imgSrc:''}
  ]
  projects:CardInfo[] = [
    {title:'Weather App',subtitle:'',
    description:'Weather app with forecast',
    cardIcons:['/assets/imgs/icons/angular-icon.svg',
    '/assets/imgs/icons/ts-icon.svg',
    '/assets/imgs/icons/html-icon.svg',
    '/assets/imgs/icons/css-icon.svg',],
    url:'https://weather-app-isahir0711.vercel.app',
    imgSrc:'/assets/imgs/ss/weather-app-ss.png'},
    
    {title:'SpotiSurprise',subtitle:'',
    description:'Share songs with ♥',
    cardIcons:['/assets/imgs/icons/net-icon.svg',
    '/assets/imgs/icons/angular-icon.svg',
    '/assets/imgs/icons/csharp-icon.svg',
    '/assets/imgs/icons/ts-icon.svg',
    '/assets/imgs/icons/msql-icon.svg',],
    url:'https://spotisurprise.vercel.app',
    imgSrc:'/assets/imgs/ss/spotisurprise-ss.png'},
  ]

  hoverAvatarIMG(){
    const $imgElement = document.getElementById('avatar-img') as HTMLImageElement;

    $imgElement.style.opacity = '0';

    setTimeout(()=>{
      $imgElement.src = "/assets/imgs/avatar.jpg";
      $imgElement.style.opacity = '1';
    },200)
  }

  unhoverAvatarIMG(){
    const $imgElement = document.getElementById('avatar-img') as HTMLImageElement;

    $imgElement.style.opacity = '0';

    setTimeout(()=>{
      $imgElement.src = "/assets/imgs/pp-izm.jpg";
      $imgElement.style.opacity = '1';
    },200)
  }

}
