import React, { useState } from 'react';
import {
  View,
  Button,
  NativeModules,
  Image
} from 'react-native';

const FilePicker = () => {

    const[image, setImage] = useState('');

    const pickImage = async () => {
        var result = await NativeModules.ReactNativeFilePicker.pick(".png,.jpg,.jpeg");
        console.log(result);
        var imageBase64 = 'data:image/png;base64,' + result;
        setImage(imageBase64);
    }

    return(
        <View>
            <Button title="Pick image" onPress={pickImage} />
            <Image style={{width: 500, height: 400, resizeMode: 'cover'}} source={{uri: image}} />
        </View>
    );
}

export default FilePicker;