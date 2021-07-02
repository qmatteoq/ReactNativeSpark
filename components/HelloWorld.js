import React, { useState } from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

const HelloWorld = (props) => {

    const[count, setCount] = useState(0);

    const increaseCounter = () => {
        setCount(count+1);
    }

    return(
        <View>
            <Text>Hello {props.name}</Text>
            <Button title="Count!" onPress={increaseCounter} />
            <Text>{count}</Text>
        </View>
    );
}

export default HelloWorld;