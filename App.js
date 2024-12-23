import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Calculator from './src/screens/Calculator';
import IMCList from './src/screens/IMCList';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Calculator"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#E59200',
            },
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#CDEDFA',
            tabBarStyle: {
              backgroundColor: '#E59200',
            },
          }}>
          <Tab.Screen
            name="Calculator"
            component={Calculator}
            options={{
              title: 'Calculadora IMC',
              tabBarLabel: 'Calculadora IMC',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="calculator"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="IMCList"
            component={IMCList}
            options={{
              title: 'IMCs',
              tabBarLabel: 'IMCs',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="list-alt" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC300',
  },
});
