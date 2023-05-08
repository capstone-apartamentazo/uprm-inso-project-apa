import Layout from '@/components/Layout';
import Listing from '@/components/Accommodation';
import Review from '@/components/Review';
import Image from 'next/image';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useLoadScript, GoogleMap,MarkerF,Marker } from '@react-google-maps/api';




const Map = () => {


	console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
	const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!



	const [marker, setMarker] = useState<google.maps.Marker>()

	const [map, setMap] = useState<google.maps.Map>()
	const [center,setCenter] = useState<google.maps.LatLng | google.maps.LatLngLiteral>({
		lat: 18.4338426,
		lng: -66.6138349
	  })

	const mapCenter = useMemo(
		() => ({
			lat: 18.213033805815353,
			lng: -67.14701348814393
		  }),
		  
			//{ lat: 18.211207, lng: -67.140544 }),
		[]
	  );

	const onLoad = useCallback(function callback(map) {
	  // This is just an example of getting and using the map instance!!! don't just blindly copy!
	  const bounds = new window.google.maps.LatLngBounds(mapCenter);
	  //map.fitBounds(bounds);
  
	  setMap(map)
	}, [])
  
	const onUnmount = useCallback(function callback(map) {
	  setMap(undefined)
	}, [])

	const onMarkerLoad = useCallback(function callback(marker) {
		setMarker(marker)
	  }, [])

	// const onDragEnd = useCallback(function callback(marker){
	// 	console.log(JSON.stringify(marker.latLng.toJSON(), null, 2))
	// },[])
	const onCenterChanged = useCallback(function callback(){
		if(map!=undefined){
			console.log(JSON.stringify(map.getCenter()!.toJSON(), null, 2))
			marker!.setPosition(map.getCenter())
		}else{
			console.log(map)
		}
		
	},[])

	
	const mapOptions = useMemo<google.maps.MapOptions>(
		() => ({
		  disableDefaultUI: true,
		  zoomControl: true,
		  clickableIcons: true,
		  scrollwheel: true,
		  rotateControl: true,
		}),
		[]
	  );



	const libraries = useMemo(() => ['places'], []);

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
		libraries: libraries as any,
	});

	

	//<MarkerF position={mapCenter} onLoad={() => console.log('Marker Loaded')} />

	if (!isLoaded) {
		return <p>Loading...</p>;
	  }

	return (
		<Layout>
		<div className='mt-24'>
      
      <GoogleMap
        options={mapOptions}
        zoom={16}
        center={center}
        //mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '800px', height: '400px' }}
        onLoad={onLoad}
		onUnmount={onUnmount}
		onCenterChanged={onCenterChanged}
		
      >
		<Marker
      position={center}
	  draggable={true}
	  onLoad={onMarkerLoad}
	  ///onDragEnd={onDragEnd}
	  
    />
	  </GoogleMap>
	  
    </div>
	</Layout>
	)

	// const [src,setSrc] = useState('')

	// useEffect(()=>{
	// 	setSrc("https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&v=weekly")

	// })




	// Initialize and add the map
	// The location of Uluru
	// const uluru = { lat: -25.344, lng: 131.031 };
	// // The map, centered at Uluru
	// const map = new google.maps.map(
	// 	document.getElementById("map") as HTMLElement,
	// 	{
	// 		zoom: 4,
	// 		center: uluru,
	// 	}
	// );

	// // The marker, positioned at Uluru
	// const marker = new google.maps.Marker({
	// 	position: uluru,
	// 	map: map,
	// });

















	// return (
	// 	<Layout>
	// 		<main className='flex flex-col'>
	// 			<div>Images</div>
	// 			<div>Name and price</div>
	// 		</main>
	// 	</Layout>
	// );
};

export default Map;
