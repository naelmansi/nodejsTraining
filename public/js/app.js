console.log('Client side javascript file is loaded! 2')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log (data)
    })
})

// //const url = 'http://api.weatherstack.com/current?access_key=6de170891a158f428837180415ed1d25&query=37.8267,-122.4233&units=f'
// const url = 'http://api.weatherstack.com/current?access_key=6de170891a158f428837180415ed1d25&query='
// fetch(url).then((response)=>{
  
//     response.json().then((data)=>{
//         if (data.success == false){
//          return   console.log ('error in the search string, please try again later.')
//         }
//         console.log (data.location )
//         console.log (data.current.weather_descriptions)

//     })
// })


const weatherForm = document.querySelector('form')
const Searchlocation = document.querySelector('input').value
const messageOne = document.querySelector('#message-1') // its is line document.getElementByid ....
const messageTwo = document.querySelector('#message-2')

messageOne.textContent=''


weatherForm.addEventListener('submit',(e)=>{
    const Searchlocation = document.querySelector('input').value
    e.preventDefault()
    console.log (Searchlocation)
    if (!Searchlocation){
        return console.log ('you have to enter location to search !')
    }
    // const url = 'http://localhost:3000/weather?address='+ Searchlocation // for heroku deployment, we can not use, the localhost
       const url = '/weather?address='+ Searchlocation // this one will work with both, localhost and heroku

    console.log ('url: ',url)
   
    messageOne.textContent = 'loading data ... please wait ..'
        messageTwo.textContent = '.'

    fetch(url).then((response)=>{

       
        
            response.json().then((data)=>{
                if (data.error){
                return messageOne.textContent= 'somthing wrong check and try again'
              
            }
              messageOne.textContent = 'location is: ' + data.location 
              messageTwo.textContent = 'the forecast is: '+ data.forecast 
                //console.log (data)

                // console.log (data.location)
                // console.log (data.forecast)            

            })
    })
})