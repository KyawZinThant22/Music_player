//Select all required tags or elements

const wrapper = document.querySelector(".wrapper");
musicImg = wrapper.querySelector(".img-area img");
musicName = wrapper.querySelector(".song-details .name");
musicArtist = wrapper.querySelector(".song-details .artist");
mainAudio = wrapper.querySelector("#main-audio");
playPauseBtn = wrapper.querySelector(".play-pause");
prevBtn = wrapper.querySelector("#prev");
nextBtn = wrapper.querySelector("#next");
progressBar = wrapper.querySelector(".progress-bar");
progressArea = wrapper.querySelector(".progress-area");
musiclist = wrapper.querySelector(".music-list")
showMoreBtn = wrapper.querySelector("#more-music");
hideMusicBtn = wrapper.querySelector("#close");

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);

window.addEventListener('load',function(){
    loadMusic(musicIndex);
    playingNow();
})

//load music functin
function loadMusic(indexNumber){
    musicName.innerHTML = allMusic[indexNumber-1].name;
    musicArtist.innerHTML = allMusic[indexNumber-1].artist;
    musicImg.src = `images/${allMusic[indexNumber-1].img}.jpg`;
    mainAudio.src = `songs/${allMusic[indexNumber-1].src}.mp3`;
}

//play music function
function playMusic(){
    wrapper.classList.add("paused");
    mainAudio.play();
    playPauseBtn.querySelector("i").innerHTML = "pause";
    playPauseBtn.classList.add("pause");
}

//pause music function
function pasuseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerHTML = "play_arrow";

    mainAudio.pause();
}

//next music function
function nextMusic(){
    musicIndex++
    //if musicIndex is greater than array lenght then musicIndex will play form start
    musicIndex > allMusic.length? musicIndex = 1 : musicIndex =musicIndex; 
    loadMusic(musicIndex)
    playMusic();
    playingNow();
}

//pre music function
function preMusic(){
    musicIndex--
    //if musicIndex is less than array length then musicIndex will play form last
    musicIndex < 1? musicIndex = allMusic.length : musicIndex =musicIndex; 
    loadMusic(musicIndex)
    playMusic();
    playingNow();
}

//play or musci button event
playPauseBtn.addEventListener('click',()=>{
    const isMusicPaused = wrapper.classList.contains("paused");
    //if isMusicPasued is ture then call puaseMusci else playMusic
    isMusicPaused? pasuseMusic() : playMusic();
    playingNow();
})


//next music btn event
nextBtn.addEventListener('click',()=>{
    nextMusic();
});

//prev music btn event
prevBtn.addEventListener('click',()=>{
    preMusic();
});


//upgrate progress bar according to current music time
mainAudio.addEventListener("timeupdate", (e)=>{
    // console.log(e.target.currentTime, e.target.duration);
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration)*100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrenttime = wrapper.querySelector(".current");
    musicDuration = wrapper.querySelector(".duration")

    mainAudio.addEventListener("loadeddata", ()=>{  
        //update song total duration
        let audioDuration = mainAudio.duration;
        let audioMinute = Math.floor(audioDuration / 60);
        let audioSecond = Math.floor(audioDuration % 60);
        if(audioSecond<10){
           audioSecond = `0${audioSecond}`
        }
        musicDuration.innerHTML = `${audioMinute}:${audioSecond}`
    })
    
    //update current song time 
    let currentMin = Math.floor(currentTime / 60);
    let currentSecond = Math.floor(currentTime % 60);

    if(currentSecond < 10){
        currentSecond = `0${currentSecond}`;
    }
    musicCurrenttime.innerHTML = `${currentMin}:${currentSecond}`;
})

//let update playing song current song according to the progress bar width

progressArea.addEventListener('click',(e)=>{
    let progressWidth = progressArea.clientWidth;
    let clickOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;
   
    mainAudio.currentTime = ( clickOffsetX / progressWidth) * songDuration;
    playMusic(); 
})

//work on repeat 
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener('click', ()=>{
    let getText = repeatBtn.innerHTML;
    // innerhtml to change the shape of icon
    switch(getText){
        case  "repeat": //if the icon is repeat then change it to repeat_one
             repeatBtn.innerHTML = 'repeat_one';
             repeatBtn.setAttribute("title", "Song looped");
        
             break;
        case  "repeat_one": //if the icon is repeat_one then change it to shuffle
             repeatBtn.innerHTML = 'shuffle';
             repeatBtn.setAttribute("title", "Playback shuffle");

             break;
        case  "shuffle": //if the icon is repeat then change it to repeat_one
             repeatBtn.innerHTML = 'repeat';
             repeatBtn.setAttribute("title", "playlist loop");
             break;
    }
});

// code to what to do after the song end

mainAudio.addEventListener('ended',()=>{
    let getText = repeatBtn.innerHTML;
    // innerhtml to change the shape of icon
    switch(getText){
        case  "repeat": 
             nextMusic();
             break;
        case  "repeat_one": //if the icon is repeat_one then change it to shuffle
                mainAudio.musicCurrenttime = 0;
                loadMusic(musicIndex);
                playMusic();
             break;
        case  "shuffle": //if the icon is repeat then change it to repeat_one
            let randIndex = Math.floor((Math.random() *  allMusic.length) + 1)
            do{
                randIndex = Math.floor((Math.random() *  allMusic.length) + 1);
            }while(musicIndex == randIndex);

            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            playingNow();
             break;
    }
});



showMoreBtn.addEventListener('click', ()=>{
    musiclist.classList.toggle("show")
});

hideMusicBtn.addEventListener('click', ()=>{
    showMoreBtn.click();
});
 const ulTag = wrapper.querySelector("ul");

 //create  li according to the array lenght

 for( let i = 0 ; i < allMusic.length ; i++){
     let liTag = `<li li-index ="${ i + 1}">
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist} </p>
                    </div>
                    <audio class ="${allMusic[i].src}"  src="songs/${allMusic[i].src}.mp3"></audio>
                    <span  id="${allMusic[i].src}"  class="audio-duration">3:50</span>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

    
    liAudioTag.addEventListener("loadeddata", ()=>{
        let duration = liAudioTag.duration;
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        if(totalSec < 10){ //if sec is less than 10 then add 0 before it
          totalSec = `0${totalSec}`;
        };
        liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
        //adding t duration attribute which we will us below
        liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`) //passing total duation of song

   });
 }

 //work on playing particular song according to click

const allLiTag = ulTag.querySelectorAll("li");

function playingNow(){
    for ( let j = 0 ; j < allLiTag.length ; j++){
        const audioTag = allLiTag[j].querySelector(".audio-duration")
        //remove playing class
        if(allLiTag[j].classList.contains("playing")){
            allLiTag[j].classList.remove("playing")
            let adDuarion = audioTag.getAttribute('t-duration'); 
            audioTag.innerText= adDuarion;
        }

        if( allLiTag[j].getAttribute("li-index") == musicIndex){
            allLiTag[j].classList.add("playing");
            audioTag.innerText = "playing"
        }
        // adding onclick attribute in all li tags
        allLiTag[j].setAttribute("onclick","clicked(this)")
    }
}

//play song on li click

function clicked(e){
    let getLiIndex = e.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}
