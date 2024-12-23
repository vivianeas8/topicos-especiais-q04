import * as React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import IMCItem from '../components/IMCItem';
import IMCModel from '../models/IMCModel';

export default function IMCList({ navigation, route }) {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    IMCModel.getItems().then((items) => setItems(items));
    const unsubscribe = navigation.addListener('focus', () => {
      IMCModel.getItems().then((items) => setItems(items));
    });
    return () => {
      unsubscribe;
    };
  }, [navigation, route]);

  return (
    <View style={styles.container}>
      {items.length == 0 ? (
        <>
          <Text style={styles.titleText}>Você ainda não possui IMC salvo!</Text>
        </>
      ) : (
        <>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={styles.scrollContainer}
            data={items}
            keyExtractor={(item, index) => String(item.id)}
            renderItem={({ item }) => (
              <IMCItem item={item} navigation={navigation} />
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC300',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#730000',
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
    width: '90%',
  },
});
