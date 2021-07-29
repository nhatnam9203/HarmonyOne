import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(5),
  },
  title: {
    marginTop: scaleHeight(8),
    fontSize: scaleWidth(5),
    color: '#404040',
  },
  logo: {
    width: scaleWidth(50),
    height: scaleWidth(50),
  },
  btnEnterYourMID: {
    position: 'absolute',
    bottom: scaleHeight(1.5),
    left: scaleWidth(25),
  },
  content: {
    fontSize: scaleWidth(4.5),
    color: '#7B99BA',
  },

  containerInput: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#819596',
    flexDirection: 'row',
    paddingBottom: scaleHeight(1.5),
    height: scaleHeight(10),
    marginTop: scaleHeight(2),
    position: 'relative',
    alignItems: 'flex-end',
  },
  icon_mid: {
    width: scaleWidth(7),
    height: scaleWidth(7),
  },
  textInput: {
    width: scaleWidth(78),
    fontSize: scaleWidth(4),
    color: '#7B99BA',
    marginLeft: scaleWidth(5),
    textAlign: 'center',
    paddingRight: scaleWidth(10),
  },
  buttonContinue: (isActive) => {
    return {
      backgroundColor: isActive ? '#1366AE' : 'transparent',
      width: '100%',
      marginTop: scaleHeight(5),
      borderRadius: 5,
      height: scaleWidth(12),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: isActive ? 0 : 1,
      borderColor: '#1366AE',
    };
  },
  txtContinue: (isActive) => {
    return {
      fontSize: scaleWidth(4.5),
      color: isActive ? 'white' : '#1366AE',
    };
  },

  txtWhatIsMerchant: {
    fontSize: scaleWidth(4),
    color: '#28AAE9',
  },
  buttonWhat: {
    alignSelf: 'center',
    marginTop: scaleHeight(2),
  },
});

export default styles;
