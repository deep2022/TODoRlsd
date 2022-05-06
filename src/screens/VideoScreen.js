import React, {useState, useEffect} from 'react'
import Video from 'react-native-video'
import {View, StyleSheet, Dimensions} from 'react-native'

const VideoScreen = ({navigation}) => {
    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
      };
    const [portrait, setPortrait] = useState(isPortrait? true: false)
    useEffect(() => {
        const callback = () => setPortrait(isPortrait() ? true: false);
    
        Dimensions.addEventListener('change', callback);
      }, []);
    console.log(portrait,'isPortrait')
    return (
    <View style={styles.videoContainer}>
    <Video
        source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
        paused={false}      
        controls={true}                               
        style={styles.video}
        fullscreen={true}
        resizeMode={portrait ? 'contain': 'cover'}
        onEnd={()=> navigation.navigate('List')}
        fullscreenOrientation={'all'}
        />
    
    </View>
    )
}

const styles = StyleSheet.create({
    videoContainer: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    video: {
        position: 'relative',
        height: '100%',
        width: '100%',
        alignSelf: 'center'
    }
})

export default VideoScreen