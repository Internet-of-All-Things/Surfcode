import SoundPlayer from 'react-native-sound-player'

function playSiren() {
    try {
        // play the file tone.mp3
        SoundPlayer.playSoundFile('urgent', 'mp3')
        // or play from url
        //SoundPlayer.playUrl('https://example.com/music.mp3')
      } catch (e) {
        console.log(`cannot play the sound file`, e)
      }
}

export default {
    playSiren,
};