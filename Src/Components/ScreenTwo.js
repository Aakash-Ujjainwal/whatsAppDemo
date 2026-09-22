import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
  } from 'react-native';
  import React, {useState} from 'react';
  
  const ScreenTwo = () => {
    const [count, setCount] = useState([
      {
        id: 1,
        name: 'Mobile',
        status: false,
      },
      {
        id: 2,
        name: 'Laptop',
        status: false,
      },
      {
        id: 3,
        name: 'TV',
        status: false,
      },
      {
        id: 4,
        name: 'Ps5',
        status: false,
      },
    ]);
    const [myValue, setmyValue] = useState('');
    const selectFn = (id, type) => {
      const newArr = count.map(val => {
        if (val.id == id) {
          return {...val, status: type};
        } else {
          // return {...val, status: false};
          return val;
        }
      });
      setCount(newArr);
    };
    const deleteItem = id => {
      const newItem = count.filter(val => {
        if (val.id !== id) {
          return val;
        }
      });
      setCount(newItem);
    };
    const deleteAll = id => {
      const Newitems = count.filter(val => {
        if (!val.status) {
          return val;
        }
      });
      setCount(Newitems);
    };
    const addFn = () => {
      let myValueObj = {
        id: Math.random(),
        name: myValue,
      };
      setmyValue('')
      setCount([...count , myValueObj])
    };
    const renderMain = ({item}) => {
      return (
        <View style={styles.ListView}>
          <View style={styles.MainBtnView}>
            <TouchableOpacity onPress={() => selectFn(item.id, !item.status)}>
              {item.status !== true ? (
                <Image
                  style={styles.radioBtn}
                  source={require('../Assets/Images/uncheck.png')}
                />
              ) : (
                <Image
                  style={styles.radioBtn}
                  source={require('../Assets/Images/checked.png')}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.MainTxtView}>
            <Text>{item.name}</Text>
          </View>
          <TouchableOpacity onPress={() => deleteItem(item.id)}>
            <Image
              style={styles.deleteBtn}
              source={require('../Assets/Images/delete.webp')}
            />
          </TouchableOpacity>
        </View>
      );
    };
    return (
      <SafeAreaView style={styles.safearea}>
        <View style={styles.Maincontainer}>
          <Text style={{fontSize: 25, fontWeight: '800'}}>My Todo List</Text>
          <View style={styles.Search_addView}>
            <TextInput
              style={styles.placeholderStyle}
              placeholderTextColor="black"
              placeholder="add items"
              value={myValue}
              keyboardType="default"
              onChangeText={txt => {
                setmyValue(txt);
              }}
            />
            <TouchableOpacity disabled={myValue.length <= 0} onPress={() => addFn()}>
              <Text>AddItem</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.MainContentView}>
            <FlatList
              data={count}
              keyExtractor={item => item.id}
              renderItem={renderMain}
              bounces={false}
            />
          </View>
          <TouchableOpacity
            disabled={count.length == 0}
            onPress={() => deleteAll()}
            style={[
              styles.DeleteAllView,
              {backgroundColor: count.length == 0 ? 'gray' : 'red'},
            ]}>
            <Text>Delete All items</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  export default ScreenTwo;
  
  const styles = StyleSheet.create({
    safearea: {
      flex: 1,
    },
    Maincontainer: {
      flex: 1,
      // justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor:'red'
    },
    Search_addView: {
      height: 80,
      width: '95%',
      // backgroundColor: 'red',
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    
    },
    placeholderStyle: {
      // backgroundColor:'yellow',
      height: 50,
      width: '80%',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: 'gray',
      paddingLeft: 10,
    },
    MainContentView: {
      width: '95%',
      height: '70%',
      // backgroundColor: 'green',
      alignItems: 'center',
  
    },
    ListView: {
      width: '95%',
      // backgroundColor: 'pink',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      margin: 5,
      borderRadius: 10,
      borderColor: 'black',
      borderWidth: 1,
    
    },
    radioBtn: {
      height: 30,
      width: 30,
    },
    MainBtnView: {
      height: 50,
      width: 50,
      // backgroundColor: 'orange',
      justifyContent: 'center',
      alignItems: 'center',
    },
    MainTxtView: {
      width: '60%',
      // backgroundColor: 'brown',
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteBtn: {
      height: 30,
      width: 30,
      marginRight: 10,
    },
    DeleteAllView: {
      height: 50,
      width: '95%',
      // backgroundColor: 'red',
      marginTop: 10,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
