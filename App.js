import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import React, {useState} from 'react';
import database from '@react-native-firebase/database';

const App = () => {
  const [input, setInput] = useState(null);
  const [list, setList] = useState(null);
  const handleData = async () => {
    try {
      const response = await database().ref('todo/2').set({value: input});
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="flex-1 bg-white">
      <View className="justify-center items-center m-3">
        <TextInput
          className="w-full border-solid border-black mt-10 px-5 border-2 rounded-sm"
          placeholder="Enter Your Name"
          onChangeText={value => setInput(value)}
          value={input}
        />
        <TouchableOpacity
          className="bg-blue-500 w-full mx-3 my-5 py-2 rounded-md"
          onPress={() => handleData()}>
          <Text className="text-center text-xl font-bold text-black">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
