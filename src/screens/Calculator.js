import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IMCModel from '../models/IMCModel';
import CustomImage from '../components/CustomImage';
import medica from '../../assets/medica.png';
import balanca from '../../assets/balanca.png';

export default function Calculator() {
  const [peso, setPeso] = React.useState('');
  const [altura, setAltura] = React.useState('');

  async function saveImc(imc, msg) {
    const listItem = {
      weight: peso,
      height: altura,
      imc: imc,
      info: msg,
    };

    IMCModel.saveItem(listItem)
      .then(() => {
        handleClear();
        Alert.alert('Cálculo do IMC!!!', 'IMC salvo com sucesso!');
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Atenção!!!', 'Erro ao salvar IMC!!');
      });
  }

  function handleSubmit() {
    let msg = '';
    let titulo = '';
    let info = '';
    let podeSalvar = false;
    const alt = altura / 100;
    const imc = peso / (alt * alt);

    if (imc <= 0 || alt <= 0 || peso <= 0) {
      titulo = 'Atenção!!!';
      msg =
        'Dados incorretos! Por favor, informe os campos. Exemplo: Peso: 40 (kg), Altura: 150 (cm)';
    } else if (imc < 17) {
      podeSalvar = true;
      titulo = 'Cálculo do IMC!!!';
      info = 'Você está MUITO ABAIXO do peso!';
      msg = `IMC = ${imc.toFixed(2)} \n${info}`;
    } else if (imc >= 17 && imc < 18.5) {
      podeSalvar = true;
      titulo = 'Cálculo do IMC!!!';
      info = 'Você está ABAIXO do peso!';
      msg = `IMC = ${imc.toFixed(2)} \n${info}`;
    } else if (imc >= 18.5 && imc < 25) {
      podeSalvar = true;
      titulo = 'Cálculo do IMC!!!';
      info = 'Você está com peso NORMAL!';
      msg = `IMC = ${imc.toFixed(2)} \n${info}`;
    } else if (imc >= 25 && imc < 30) {
      podeSalvar = true;
      titulo = 'Cálculo do IMC!!!';
      info = 'Você está com SOBREPESO!';
      msg = `IMC = ${imc.toFixed(2)} \n${info}`;
    } else if (imc >= 30 && imc < 35) {
      podeSalvar = true;
      titulo = 'Cálculo do IMC!!!';
      info = 'Você está OBESO (Ou seja, obesidade grau 1)!';
      msg = `IMC = ${imc.toFixed(2)} \n${info}`;
    } else if (imc >= 35 && imc < 40) {
      podeSalvar = true;
      titulo = 'Cálculo do IMC!!!';
      info = 'Você está OBESIDADE SEVERA (Ou seja, obesidade grau 2)!';
      msg = `IMC = ${imc.toFixed(2)} \n${info}`;
    } else if (imc >= 40) {
      podeSalvar = true;
      titulo = 'Cálculo do IMC!!!';
      info = 'Você está OBESIDADE MÓRBIDA (Ou seja, obesidade grau 3)!';
      msg = `IMC = ${imc.toFixed(2)} \n${info}`;
    }

    if (podeSalvar) {
      Alert.alert(
        titulo,
        msg,
        [
          {
            text: 'Salvar?',
            onPress: () => {
              saveImc(imc, info);
            },
          },
          {
            text: 'Fechar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(titulo, msg);
    }
  }

  function handleClear() {
    setAltura('');
    setPeso('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView vertical>
        <View>
          <CustomImage
            fromWeb={false}
            image={balanca}
            title={'Calcule seu IMC'}
            width={147}
            height={168}
          />

          <TextInput
            style={styles.input}
            value={peso}
            onChangeText={(peso) => setPeso(peso)}
            placeholder="Digite o peso (Kg)"
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            value={altura}
            onChangeText={(altura) => setAltura(altura)}
            placeholder="Digite a altura (cm)"
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <CustomImage
              fromWeb={false}
              image={medica}
              title={'Calcular'}
              width={125}
              height={213}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleClear}>
            <Text style={styles.text}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC300',
  },
  input: {
    backgroundColor: '#E59200',
    borderColor: '#AD6200',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 30,
    padding: 10,
    color: '#FFF',
    fontSize: 23,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 30,
    backgroundColor: '#E59200',
    padding: 10,
    borderRadius: 10,
    borderColor: '#AD6200',
    borderWidth: 1,
  },
  text: {
    color: '#8D4600',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
