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
        //one liner
        //entry.target.classList.toggle('show-animate', entry.isIntersecting);
        if(entry.isIntersecting){
          entry.target.classList.add('show-animate');
        }
        else{
          //remove it or change to one liner
        }
      });
    });
  
    const articles = document.querySelectorAll('.hidden-content');
    articles.forEach((element) => observer.observe(element)); 
  }

  experience:CardInfo[] = [
    {title:'Avents',
    description:'Developed a web applicaciont to organize events and appointments, with a subscription functionality',
    cardIcons:['/assets/icons/dotnet-logo.svg',
    '/assets/icons/c-sharp-c.svg',
    '/assets/icons/azure.svg',
    '/assets/icons/sql-server.svg',
    '/assets/icons/html5.svg',
    '/assets/icons/css.svg',],
    subtitle:'June 2021 - December 2023',
    url:'https://www.avents.co',
    imgSrc:''}
  ]
  projects:CardInfo[] = [
    {title:'Love In Lines',subtitle:'',
    description:'Doodle, save, and draw together in real-time on our simple, fun platform. Connect with friends for a playful drawing experience. Easy and delightful – start doodling now!',
    cardIcons:['/assets/icons/angular.svg',
    '/assets/icons/typescript.svg',
    '/assets/icons/html5.svg',
    '/assets/icons/css.svg',],
    url:'https://loveinlines.vercel.app',
    imgSrc:'/assets/imgs/ss/loveinlines-ss.png'},
    
    {title:'SpotiSurprise',subtitle:'',
    description:'Share songs with ♥, Create a playlist and share a song everyday',
    cardIcons:['/assets/icons/dotnet-logo.svg',
    '/assets/icons/angular.svg',
    '/assets/icons/c-sharp-c.svg',
    '/assets/icons/typescript.svg',
    '/assets/icons/sql-server.svg',],
    url:'https://spotisurprise.vercel.app',
    imgSrc:'/assets/imgs/ss/spotisurprise-ss.png'},
    
    {title:'Weather App',subtitle:'',
    description:'Weather app with forecast',
    cardIcons:['/assets/icons/angular.svg',
    '/assets/icons/typescript.svg',
    '/assets/icons/html5.svg',
    '/assets/icons/css.svg',],
    url:'https://loveinlines.vercel.app',
    imgSrc:'/assets/imgs/ss/weather-app-ss.png'}
  ]

  hoverAvatarIMG(){
    // const $imgElement = document.getElementById('avatar-img') as HTMLImageElement;

    // $imgElement.style.opacity = '0';

    // setTimeout(()=>{
    //   $imgElement.src = "/assets/imgs/avatar.jpg";
    //   $imgElement.style.opacity = '1';
    // },200)
  }

  unhoverAvatarIMG(){
    // const $imgElement = document.getElementById('avatar-img') as HTMLImageElement;

    // $imgElement.style.opacity = '0';

    // setTimeout(()=>{
    //   $imgElement.src = "/assets/imgs/pp-izm.jpg";
    //   $imgElement.style.opacity = '1';
    // },200)
  }

}
