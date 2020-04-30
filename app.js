window.addEventListener('load',()=>{ 
    let long;
    let lat;

    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone=document.querySelector(".location-timezone")
    let temperatureSection=document.querySelector(".temperature");
    const temperatureSpan=document.querySelector("temperature span");
    
    if(navigator.geolocation){ 
      navigator.geolocation.getCurrentPosition
     (position => { 
      long=position.coords.longitude;
      lat=position.coords.latitude;

     const proxy = "https://cors-anywhere.herokuapp.com/";
     const api=`${proxy}https://api.darksky.net/forecast/5fa3110425cae472a1cd51b0ffe81d09/${lat},${long}`;
     fetch(api)
          .then(response => {
             return response.json();
       })
     .then(data => { 
        const {temperature,summary,icon} = data.currently;

       //set dom elements from api

       temperatureDegree.textContent = temperature;
       temperatureDescription.textContent = summary;
       locationTimezone.textContent = data.timezone;

       // celsius formulae
       let celsius=(temperature-32)*(5/9);

      //set icon
      setIcons(icon,document.querySelector(".icon"));

      //change temp to celsius
      temperatureSection.addEventListener('click',()=>{
        if(temperatureSpan.textContent === "F"){ 
           temperatureSpan.textContent = "C";
           temperatureDegree=Math.floor(celsius);
        } else {
          temperatureSpan.textContent='F';
          temperatureDegree.textContent = temperature;
        } 
      });
   });
 });
}
 function setIcons(icon,iconID){
   const skycons = new Skycons({color:"white"});
   const currentIcon = icon.replace(/-/g,"_").toUpperCase();
   skycons.play();
  return skycons.set(iconID,Skycons[currentIcon])
  } 
 });
