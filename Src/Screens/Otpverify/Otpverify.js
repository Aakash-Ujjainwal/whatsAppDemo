import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import React, { useRef, useState, useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PhoneContext } from '../Context/Context';

const Otpverify = ({ navigation }) => {
  const { phoneNumber } = useContext(PhoneContext);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const isOtpComplete = otp.every(digit => digit !== '');
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      spinValue.setValue(0);
    }
  }, [loading, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const handleVerify = () => {
    if (!isOtpComplete) return;

    const finalOtp = otp.join('');
    console.log('Entered OTP:', finalOtp);
     setLoading(true);

    // simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Home');
    }, 3000);
  };
  return (
    <SafeAreaView style={styles.Safearaea}>
      <View style={styles.container}>
        <View style={styles.MainTextView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.Backarr}
              source={require('../../Assets/Images/Back.png')}
            />
          </TouchableOpacity>
          <Text style={styles.TxtHeading}>Enter OTP Code</Text>
        </View>

        <View style={styles.MainOtpView}>
          <Text style={styles.codesenttxt}>
            Code has been sent to <Text>{phoneNumber}</Text>
          </Text>

          <View style={styles.OTPBoxView}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                value={digit}
                onChangeText={value => handleChange(value, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                style={styles.OTPBoxViewsquare}
                keyboardType="number-pad"
                maxLength={1}
              />
            ))}
          </View>

          <Text style={styles.coderesenttxt}>
            Resend Code in <Text style={{ color: 'green' }}>56</Text> s
          </Text>
        </View>

        <TouchableOpacity disabled={!isOtpComplete} onPress={handleVerify}>
          <View
            style={[
              styles.VerifyBtnView,
              { backgroundColor: isOtpComplete ? 'black' : 'grey' },
            ]}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>
              Verify
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* 🔥 Loader Overlay */}
      {loading && (
        <View style={styles.loaderOverlay}>
          <View style={styles.loaderBox}>
            <Animated.View
              style={[styles.spinner, { transform: [{ rotate: spin }] }]}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Otpverify;

const styles = StyleSheet.create({
  Safearaea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  MainTextView: {
    height: 50,
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  Backarr: {
    marginRight: 20,
  },
  TxtHeading: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  MainOtpView: {
    height: '35%',
    width: '100%',
    marginTop: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  OTPBoxView: {
    height: 70,
    width: '90%',
    marginTop: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  codesenttxt: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    marginBottom: 20,
  },
  coderesenttxt: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    marginTop: 50,
  },
  OTPBoxViewsquare: {
    height: 55,
    width: 55,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
  },
  VerifyBtnView: {
    height: 40,
    width: 330,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: '50%',
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBox: {
    width: 120,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: '#25D366',
    borderTopColor: 'transparent',
  },
});
