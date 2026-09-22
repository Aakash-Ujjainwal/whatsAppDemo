/* eslint-disable react-native/no-inline-styles */

import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const Comp1 = () => {
  const [Task, setTask] = useState([
    {
      id: 1,
      TaskName: 'Work on Project',
    },
    {
      id: 2,
      TaskName: 'Learning Javascript',
    },
    {
      id: 3,
      TaskName: 'Push Code on github',
    },
    {
      id: 4,
      TaskName: 'Work on final submit',
    },
  ]);
  const deleteItem = id => {
    const NewItem = Task.filter(val => {
      if (val.id !== id) {
        return val;
      }
    });
     setTask(NewItem);
  };
  const renderComponents = ({item}) => {
    return (
      <View style={styles.FlView}>
        <Text>{item.TaskName}</Text>
        <TouchableOpacity onPress={() => deleteItem(item.id)}>
          <Image
            style={styles.DeleteIcon}
            source={require('../Assets/Images/delete.webp')}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.MainContainer}>
        <Text style={styles.headingTxt}>Select Delete</Text>
        <View style={styles.MainFLContainer}>
          <FlatList
            data={Task}
            keyExtractor={item => item.id}
            bounces={false}
            renderItem={renderComponents}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Comp1;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'aliceblue',
  },
  headingTxt: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: '600',
  },
  MainFLContainer: {
    flex: 1,
    // backgroundColor: 'red',
    marginBottom: 30,
  },
  FlView: {
    height: 40,
    width: 330,
    backgroundColor: 'gray',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
  },
  DeleteIcon: {
    height: 20,
    width: 20,
  },
});
