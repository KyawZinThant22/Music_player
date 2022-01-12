//Select all required tags or elements

const wrapper = document.querySelector(".wrapper");
musicImg = wrapper.querySelector(".img-area img");
musicName = wrapper.querySelector(".song-details .name");
musicArtist = wrapper.querySelector(".song-details .artist");
mainAudio = wrapper.querySelector("#main-audio");
playPauseBtn = wrapper.querySelector(".play-pause");
prevBtn = wrapper.querySelector("#prev");
nextBtn = wrapper.querySelector("#next");
progressBar = wrapper.querySelector(".progress-bar")



let musicIndex =1;

window.addEventListener('load',function(){
    loadMusic(musicIndex);
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
}

//next music function
function preMusic(){
    musicIndex--
    //if musicIndex is less than array length then musicIndex will play form last
    musicIndex < 1? musicIndex = allMusic.length : musicIndex =musicIndex; 
    loadMusic(musicIndex)
    playMusic();
}



//play or musci button event
playPauseBtn.addEventListener('click',()=>{
    const isMusicPaused = wrapper.classList.contains("paused");
    //if isMusicPasued is ture then call puaseMusci else playMusic
    isMusicPaused? pasuseMusic() : playMusic();
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
        currentSecond = `0${currentSecond}`
    }
    musicCurrenttime.innerHTML = `${currentMin}:${currentSecond}`;
})

//let update playing song current song according to the progress bar width
