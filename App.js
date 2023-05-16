import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
// import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import Home from './screens/Home';
const App = () => {
  useEffect(() => {
    getDataBase();
  }, []);
  const [myData, setMyData] = useState(null);
  const getDataBase = async () => {
    try {
      const data = await database().ref('users/1').once('value');
      //   console.log(data);
      setMyData(data.val());

      //This is for FireStore
      //   const data = await firestore()
      //     .collection('Testing')
      //     .doc('cSbOnDpe3KKsKbLlVD3p')
      //     .get();
      //   setMyData(data._data);
      //   console.log(data._data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="mt-8 px-5  bg-slate-500 py-2 items-center">
      <Text className="text-black font-bold text-xl">
        Name: {myData ? myData.Name : 'Loging...'}
      </Text>
      <Text className="text-black font-bold text-xl">
        Age: {myData ? myData.Age : 'Loging...'}
      </Text>
      <Text className="text-black font-bold text-xl">
        City: {myData ? myData.City : 'Loging...'}
      </Text>
    </View>
  );
};

export default App;
