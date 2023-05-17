import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';

const App = () => {
  const [input, setInput] = useState(null);
  const [list, setList] = useState(null);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [setectedCardIndex, setSetectedCardIndex] = useState(null);
  useEffect(() => {
    getDataBase();
  }, []);

  const getDataBase = async () => {
    try {
      const data = await database()
        .ref('todo')
        .on('value', tempData => {
          setList(tempData.val());
        });
      //   console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleData = async () => {
    try {
      if (input.length > 0) {
        const index = list.length;
        const response = await database()
          .ref(`todo/${index}`)
          .set({value: input});
        //   console.log(response);
        setInput('');
        getDataBase();
      } else {
        alert('Please Enter Vaild Value');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateData = async () => {
    try {
      if (input.length > 0) {
        const response = await database()
          .ref(`todo/${setectedCardIndex}`)
          .update({value: input});
        setInput('');
        setIsUpdateData(false);
      } else {
        alert('Please Enter Vaild Value');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlecardPress = (cardIndex, cardValue) => {
    try {
      // console.log(cardIndex, cardValue);
      setIsUpdateData(true);
      setSetectedCardIndex(cardIndex);
      setInput(cardValue);
    } catch (error) {
      console.log(error);
    }
  };
  const handlecardLongPress = (cardIndex, cardValue) => {
    try {
      Alert.alert('Alert', `Are You Sure To Delete ${cardValue}`, [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel IsPress...');
          },
        },
        {
          text: 'Ok',
          onPress: async () => {
            try {
              const response = await database()
                .ref(`todo/${cardIndex}`)
                .remove();
              setInput('');
              setIsUpdateData(false);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]);
      // console.log(cardIndex, cardValue);
      // setIsUpdateData(true);
      // setSetectedCardIndex(cardIndex);
      // setInput(cardValue);
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
        {!isUpdateData ? (
          <TouchableOpacity
            className="bg-blue-500 w-full mx-3 my-5 py-2 rounded-md"
            onPress={() => handleData()}>
            <Text className="text-center text-xl font-bold text-black">
              Add
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="bg-blue-500 w-full mx-3 my-5 py-2 rounded-md"
            onPress={() => handleUpdateData()}>
            <Text className="text-center text-xl font-bold text-black">
              Update
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="m-3 px-3">
        <Text className="text-black text-2xl font-bold mb-5">Todo-List</Text>

        <FlatList
          data={list}
          renderItem={item => {
            if (item.item !== null) {
              return (
                <TouchableOpacity
                  className="my-3"
                  onPress={() => {
                    handlecardPress(item.index, item.item.value);
                  }}
                  onLongPress={() => {
                    handlecardLongPress(item.index, item.item.value);
                  }}>
                  <Text className="text-xl">{item.item.value}</Text>
                </TouchableOpacity>
              );
            }
          }}
        />
      </View>
    </View>
  );
};

export default App;
