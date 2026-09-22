import { View } from 'react-native';
import React, { useState } from 'react';
import AppNavigator from './Src/Nevigation/AppNavigator';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { PhoneContext } from './Src/Screens/Context/Context';
const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <PhoneContext.Provider value={{ phoneNumber, setPhoneNumber }}>
      <View style={{ flex: 1 }}>
        <AppNavigator />
      </View>
    </PhoneContext.Provider>
  );
};

export default App;
