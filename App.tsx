import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {Currency} from './types/currency';
import CurrencySection from './CurrencySection';
import WebSocketController from './utils/websocket';
import {useSelector} from 'react-redux';
import {selectConnected} from './redux/currency';

const currenciesWebSocket = new WebSocketController();

const App = () => {
  const connectionStaus = useSelector(selectConnected);

  const connectToWebSocket = () => {
    const productIds = Object.values(Currency).map(currency => {
      return `${currency}-USD`;
    });
    const channels = ['ticker'];
    currenciesWebSocket.connect(productIds, channels);
  };
  const disconnectFromWebSocket = () => {
    currenciesWebSocket.disconnect();
  };

  const buttonConnectionStyle: StyleProp<ViewStyle> = {
    backgroundColor: connectionStaus ? 'red' : 'green',
    borderColor: connectionStaus ? 'red' : 'green',
  };

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.backgroundStyle.backgroundColor}
      />
      <View style={styles.header}>
        <Text>Valor de las divisas con respecto al USD</Text>
      </View>
      <View style={styles.sections}>
        {Object.values(Currency).map(currency => (
          <CurrencySection key={currency} currency={currency} />
        ))}
      </View>
      <Pressable
        style={[styles.connectionButton, buttonConnectionStyle]}
        onPress={
          connectionStaus ? disconnectFromWebSocket : connectToWebSocket
        }>
        <Text style={styles.buttonText}>
          {connectionStaus
            ? 'Disconnect from WebSocket'
            : 'Connect to WebSocket'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: 'white',
    alignItems: 'center',
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sections: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  connectionButton: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
