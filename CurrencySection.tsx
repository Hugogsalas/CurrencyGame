import React, {useCallback, useEffect, useState} from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  useAnimatedValue,
  Image,
} from 'react-native';
import {CurrencyRates, Currency} from './types/currency';
import {trigger} from 'react-native-haptic-feedback';
import {Animated, Easing} from 'react-native';
import {CurrenciesFlags} from './utils/constansts';
import {
  CurrencyUSDEquivalent,
  RootState,
  selectConnected,
  selectCurrencyMessages,
} from './redux/currency';
import {useSelector} from 'react-redux';

interface CurrencySectionProps {
  currency: Currency;
}

/**
 * CurrencySection Component
 *
 * This component displays the current exchange rate for a given currency.
 * It fetches the exchange rate from the Coinbase API and provides a pressable
 * interface with ripple animation for refreshing the data.
 *
 * Props:
 * @param {CurrencySectionProps} props - The props for the component.
 * @param {string} props.currency - The currency code to fetch exchange rates for.
 *
 * State:
 * - `actualCurrencyRate` (CurrencyRates | null): Stores the fetched exchange rate data.
 * - `loading` (boolean): Indicates whether the data is currently being fetched.
 * - `error` (string | null): Stores any error message encountered during fetching.
 *
 * Redux:
 * - `message` (CurrencyMessage): Selected currency message from the Redux store.
 * - `connected` (boolean): Indicates whether the app is connected to the internet.
 *
 * Methods:
 * - `fetchCurrency`: Fetches the exchange rate data from the Coinbase API.
 * - `onPress`: Triggers a refresh of the exchange rate data.
 * - `startRippleAnimation`: Starts the ripple animation on press.
 * - `onPressWithAnimation`: Combines the ripple animation and data refresh logic.
 *
 * Effects:
 * - Fetches the exchange rate data when the component mounts or when the `currency` prop changes.
 *
 * UI:
 * - Displays an error message if fetching fails.
 * - Shows a loading indicator while fetching data.
 * - Displays the currency symbol, name, and exchange rate when data is available.
 * - Includes a ripple animation effect when the component is pressed.
 *
 * Dependencies:
 * - React, React Native, Redux, and Animated libraries.
 * - `CurrenciesFlags` for currency icons and colors.
 * - `trigger` for haptic feedback.
 *
 * Notes:
 * - The component uses `useCallback` to memoize the `fetchCurrency` function.
 * - Ripple animation is implemented using React Native's `Animated` API.
 */
const CurrencySection: React.FC<CurrencySectionProps> = ({currency}) => {
  const [actualCurrencyRate, setActualCurrencyRate] =
    useState<CurrencyRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const message = useSelector((state: RootState) =>
    selectCurrencyMessages(state, (currency + '-USD') as CurrencyUSDEquivalent),
  );
  const connected = useSelector(selectConnected);

  const fetchCurrency = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`,
      );
      const data = await response.json();
      setActualCurrencyRate(data.data);
      setError(null);
    } catch {
      setError('Error fetching currencies');
      setActualCurrencyRate(null);
    } finally {
      setLoading(false);
    }
  }, [currency]);

  useEffect(() => {
    fetchCurrency();
  }, [fetchCurrency]);

  const onPress = () => {
    trigger('impactHeavy');
    setLoading(true);
    fetchCurrency();
  };

  const rippleAnimation = useAnimatedValue(0);

  const startRippleAnimation = () => {
    rippleAnimation.setValue(0);
    Animated.timing(rippleAnimation, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.circle),
      useNativeDriver: true,
    }).start();
  };

  const rippleScale = rippleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 3],
  });

  const rippleOpacity = rippleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0],
  });

  const onPressWithAnimation = () => {
    startRippleAnimation();
    onPress();
  };

  if (error) {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{error}</Text>
      </View>
    );
  }

  return (
    <Pressable style={styles.sectionContainer} onPress={onPressWithAnimation}>
      <Animated.View
        style={[
          styles.ripple,
          {
            transform: [
              {
                scale: rippleScale,
              },
            ],
            opacity: rippleOpacity,
            backgroundColor:
              CurrenciesFlags[actualCurrencyRate?.currency ?? Currency.BTC]
                .color,
          },
        ]}
      />
      <View style={styles.pressableContainer}>
        {!loading && actualCurrencyRate ? (
          <>
            <View style={styles.currencyContainer}>
              <Image
                style={styles.tinyLogo}
                source={CurrenciesFlags[actualCurrencyRate.currency].icon}
              />
              <Text style={styles.sectionTitle}>
                {actualCurrencyRate.currency}
              </Text>
            </View>
            <Text style={styles.sectionDescription}>
              $
              {connected
                ? Number(message?.ticker?.price).toFixed(3)
                : Number(actualCurrencyRate.rates.USD).toFixed(3)}
            </Text>
          </>
        ) : (
          <ActivityIndicator size="small" />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    width: '80%',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    position: 'relative',
    overflow: 'hidden',
  },
  pressableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '20%',
    gap: 10,
  },
  ripple: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tinyLogo: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default CurrencySection;
