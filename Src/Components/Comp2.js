import {SafeAreaView, StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState} from 'react';

const Comp2 = () => {
  const Listt = [
    {
      id: 1,
      product: 'Tv',
      price: 10000,
    },
    {
      id: 2,
      product: 'Laptop',
      price: 500000,
    },
    {
      id: 3,
      product: 'Mobile',
      price: 100000,
    },
    {
      id: 4,
      product: 'PC',
      price: 1000000,
    },
  ];
  const [ListData, SetListData] = useState(Listt);

  const renderItemm = ({item}) => {
    return (
      <View style={styles.listView}>
        <Text>{item.product}</Text>
           <Text>{item.price}</Text>
      </View>
    );
  };
  console.log('ListData', ListData);
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.MainContainer}>
        <Text>List Components</Text>
        <FlatList
          data={ListData}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItemm}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          ListEmptyComponent={true && <Text>No Data Found</Text>}
          ListFooterComponent={true && <Text>Footer</Text>}
          getItemLayout={(data, index) => ({
            length: 90,
            offset: 50 * index,
            index,
          })}
        />
      </View>
    </SafeAreaView>
  );
};

export default Comp2;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    // backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainContainer: {
    flex: 1,
    // backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listView: {
    height: 40,
    width: 330,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
