import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Onbaord');
    }, 2500);
  }, [navigation]);
  return (
    <SafeAreaView style={styles.safearea}>
      <ImageBackground source={require('../../Assets/Images/bgim2.png')}  style={styles.MainContainer}>
        {/* <Image
          style={styles.MainLogo}
          source={require('../../Assets/Images/whatsapp.png')}
        />
        <View style={styles.BottomView}>
          <Text style={styles.txtFrom}>From</Text>
          <View style={styles.MetaView}>
            <Image
              style={styles.MetaLogo}
              source={require('../../Assets/Images/metaicon.png')}
            />
            <Text style={styles.txtMeta}>Meta</Text>
          </View>
        </View> */}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:'#0000'
  },
  MainLogo: {
    height: 100,
    width: 100,
    tintColor: '#25D366',
    // marginTop: 250,
  },
  BottomView: {
    height: 60,
    width: 330,
    // backgroundColor: 'red',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 25,
  },
  MetaView: {
    height: 30,
    width: 250,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  MetaLogo: {
    height: 40,
    width: 40,
    tintColor: '#25D366',
  },
  txtMeta: {
    fontSize: 20,
    fontWeight: '700',
    color: '#25D366',
    marginLeft: 5,
  },
  txtFrom: {
    fontWeight: '500',
    color: 'gray',
  },
});
