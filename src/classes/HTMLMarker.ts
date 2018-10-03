import {} from '@types/googlemaps';

export default class HTMLMarker extends google.maps.OverlayView {

  lat:number;
  lng:number;
  pos: google.maps.LatLng;
  div: HTMLElement = null;
  price: string = "";
  callback: any = null;

  constructor(lat,lng,price, callback = ()=>{}){
    super();
    this.lat = lat;
    this.lng = lng;
    this.price = price;
    this.pos = new google.maps.LatLng(lat,lng);
    this.callback = callback;
  }

  onRemove(){}
  onAdd(){
    console.log('onAdd');
    let div = document.createElement('div');
    div.onclick = ()=>{
      if (this.callback) this.callback();
    };
    div.className = "arrow_box";
    div.innerHTML = "<div class='price__inner'><p class='price__inner__text'>"+this.price+"</p></div>";
    let panes = this.getPanes();
    panes.overlayImage.appendChild(div);
    this.div = div;
  }
  draw(){


    console.log('draw',this.div.offsetWidth);
    let overlayProjection = this.getProjection();
    let position = overlayProjection.fromLatLngToDivPixel(this.pos);
    let panes = this.getPanes();
    (<any>panes).overlayImage.style.left = position.x - this.div.offsetWidth/2 + 'px';
    (<any>panes).overlayImage.style.top = position.y - 30 + 'px';
  }
}
