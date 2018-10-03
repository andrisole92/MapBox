// import {} from '@types/googlemaps';
//
// export default class PriceMarker extends google.maps.Marker  {
//
//   pos: google.maps.LatLng;
//   div: HTMLElement = null;
//   price: string = "";
//   image = {
//     url: 'http://www.homedepot.com/catalog/swatchImages/35/04/04a604de-8b52-4cd8-a394-6286f00b438d_35.jpg',
//     size: new google.maps.Size(35, 35),
//     origin: new google.maps.Point(0, 0),
//     anchor: new google.maps.Point(0, 35)
//   };
//
//   constructor(lat,lng,price,map){
//     super(new google.maps.LatLng(lat,lng));
//     let image = {
//       url: 'http://www.homedepot.com/catalog/swatchImages/35/04/04a604de-8b52-4cd8-a394-6286f00b438d_35.jpg',
//       size: new google.maps.Size(35, 35),
//       origin: new google.maps.Point(0, 0),
//       anchor: new google.maps.Point(0, 35)
//     };
//     super({
//       position: new google.maps.LatLng(lat,lng),
//       map: map,
//       draggable: true,
//       icon: image,
//       label: {
//         text: price,
//         color: 'white',
//         fontSize: '15px',
//         fontWeight: 'bold'
//       }
//     });
//     this.addListener('click', function() {
//       console.log('click')
//       map.setZoom(8);
//       map.setCenter(this.getPosition());
//     });
//   }
//
//
// }
