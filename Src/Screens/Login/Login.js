import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  createContext,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  useWindowDimensions,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CountryPicker } from 'react-native-country-codes-picker';
import { PhoneContext } from '../Context/Context';

const Login = ({ navigation }) => {
  const { setPhoneNumber } = useContext(PhoneContext);
  const { width, height } = useWindowDimensions();
  const scale = width / 375;
  const normalize = size => Math.round(scale * size);

  const [phone, setPhone] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [country, setCountry] = useState({
    name: 'India',
    dial_code: '+91',
  });

  const isLandscape = width > height;

  // 🔥 Animated Loader Setup
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

  const handleNext = () => {
    if (!phone) return;

    setLoading(true);

    // simulate API call
    setTimeout(() => {
      setLoading(false);
      const fullNumber = country.dial_code + phone;
      setPhoneNumber(fullNumber);
      navigation.navigate('Otpverify');
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
              <View
                style={[
                  styles.container,
                  {
                    paddingHorizontal: width * 0.08,
                    paddingTop: isLandscape ? height * 0.08 : height * 0.05,
                  },
                ]}
              >
                {/* Header */}
                <View style={styles.header}>
                  <Text style={[styles.title, { fontSize: normalize(20) }]}>
                    Enter your phone number
                  </Text>
                  <Image
                    style={styles.imgDots}
                    source={require('../../Assets/Images/Tdots.png')}
                  />
                </View>

                <Text style={[styles.subtitle, { marginTop: height * 0.02 }]}>
                  WhatsApp will need to verify your phone number.{' '}
                  <Text style={styles.link}>What’s my number?</Text>
                </Text>

                {/* Country Selector */}
                <TouchableOpacity
                  onPress={() => setShow(true)}
                  style={[
                    styles.countryContainer,
                    { marginTop: height * 0.05 },
                  ]}
                >
                  <Text style={{ fontSize: normalize(16) }}>
                    {country?.name}
                  </Text>
                  <Image
                    style={styles.downarr}
                    source={require('../../Assets/Images/downarr.png')}
                  />
                </TouchableOpacity>

                {/* Phone Input Row */}
                <View style={[styles.inputRow, { marginTop: height * 0.03 }]}>
                  <Text
                    style={[
                      styles.codeText,
                      {
                        fontSize: normalize(16),
                        paddingBottom: normalize(6),
                      },
                    ]}
                  >
                    {country?.dial_code}
                  </Text>

                  <TextInput
                    style={[
                      styles.phoneInput,
                      {
                        fontSize: normalize(16),
                        marginLeft: normalize(20),
                        paddingBottom: normalize(6),
                      },
                    ]}
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                    maxLength={15}
                  />
                </View>

                <Text style={[styles.carrierText, { fontSize: normalize(12) }]}>
                  Carrier charges may apply
                </Text>
              </View>

              {/* Bottom Button */}
              <View
                style={[
                  styles.bottomContainer,
                  { marginBottom: height * 0.05 },
                ]}
              >
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={handleNext}
                >
                  <Text style={[styles.nextText, { fontSize: normalize(14) }]}>
                    NEXT
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

        {/* Country Picker */}
        <CountryPicker
          show={show}
          pickerButtonOnPress={item => {
            if (!item) return;
            setCountry({
              name: item?.name?.en || item?.name,
              dial_code: item?.dial_code,
            });
            setShow(false);
          }}
          onBackdropPress={() => setShow(false)}
        />

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

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    color: '#444',
    lineHeight: 20,
  },
  link: {
    color: '#128C7E',
  },
  countryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#128C7E',
    paddingBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
  },
  codeText: {
    color: '#000',
    borderBottomWidth: 1.5,
    borderBottomColor: '#128C7E',
    paddingHorizontal: 4,
  },
  phoneInput: {
    flex: 1,
    borderBottomWidth: 1.5,
    borderBottomColor: '#128C7E',
    color: '#000',
  },
  carrierText: {
    color: '#666',
    marginTop: 10,
    alignSelf: 'center',
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#128C7E',
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 4,
  },
  nextText: {
    color: '#fff',
    fontWeight: '600',
  },
  imgDots: {
    marginLeft: 20,
    height: '100%',
  },
  downarr: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },

  // 🔥 Loader Styles
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
