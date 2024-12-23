import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import IMCModel from '../models/IMCModel';

export default function IMCItem(props) {

  function handleDeletePress() {
    Alert.alert(
      'Atenção:',
      "Tem certeza que deseja excluir esse IMC?",
      [
        {
          text: 'Não',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            IMCModel.deleteItem(props.item.id).then(() =>
              props.navigation.navigate('IMCList', { id: props.item.id })
            );
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.itemTextName}>{props.item.info}</Text>
      
      <View style={styles.itemLayoutDetail}>
        <Text style={styles.itemTextDetailTitle}>Peso (kg): </Text>
        <Text style={styles.itemTextDetail}>{props.item.weight}</Text>
      </View>

      <View style={styles.itemLayoutDetail}>
        <Text style={styles.itemTextDetailTitle}>Altura (cm): </Text>
        <Text style={styles.itemTextDetail}>{props.item.height}</Text>
      </View>

      <View style={styles.itemLayoutDetail}>
        <Text style={styles.itemTextDetailTitle}>IMC: </Text>
        <Text style={styles.itemTextDetail}>{props.item.imc}</Text>
      </View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeletePress}>
          <MaterialCommunityIcons
            name="delete-forever"
            color="#FFF"
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEF3B4',
    marginTop: 15,
    width: '100%',
    borderRadius: 10,
    padding: 5,
  },
  itemLayoutDetail: {
    flexDirection: 'row',
  },
  itemTextName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#730000',
  },
  itemTextDetailTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#730000',
  },
  itemTextDetail: {
    fontSize: 15,
  },
  buttonsContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
  },
  deleteButton: {
    marginLeft: 10,
    height: 30,
    backgroundColor: '#D26900',
    borderRadius: 7,
    padding: 5,
    fontSize: 12,
    elevation: 10,
    shadowOpacity: 10,
    shadowColor: '#ccc',
    alignItems: 'center',
  },
});
