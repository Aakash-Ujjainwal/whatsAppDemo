import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');

const scale = width / 375; // base width reference (iPhone 11 size)

const normalize = size => {
  return Math.round(scale * size);
};

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Welcome to WhatsApp</Text>

        {/* Illustration */}
        <Image
          source={require('../../Assets/Images/circle.png')}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Privacy Text */}
        <Text style={styles.privacyText}>
          Read our <Text style={styles.linkText}>Privacy Policy</Text>. Tap
          “Agree and continue” to accept the{' '}
          <Text style={styles.linkText}>Terms of Service</Text>.
        </Text>

        {/* Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>AGREE AND CONTINUE</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.fromText}>from</Text>
          <Text style={styles.facebookText}>FACEBOOK</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.08,
    paddingVertical: height * 0.05,
  },

  title: {
    fontSize: normalize(24),
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginTop: height * 0.05,
  },

  image: {
    width: width * 0.6,
    height: height * 0.3,
  },

  privacyText: {
    fontSize: normalize(13),
    color: '#444',
    textAlign: 'center',
    lineHeight: normalize(20),
    marginVertical: height * 0.02,
  },

  linkText: {
    color: '#1B9C85',
    fontWeight: '500',
  },

  button: {
    width: '100%',
    backgroundColor: '#1B9C85',
    paddingVertical: height * 0.018,
    borderRadius: normalize(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.02,
  },

  buttonText: {
    color: '#FFF',
    fontSize: normalize(14),
    fontWeight: '600',
    letterSpacing: 1,
  },

  footer: {
    alignItems: 'center',
    marginBottom: height * 0.02,
  },

  fromText: {
    fontSize: normalize(12),
    color: '#777',
  },

  facebookText: {
    fontSize: normalize(14),
    letterSpacing: 2,
    color: '#000',
    marginTop: 4,
  },
});
