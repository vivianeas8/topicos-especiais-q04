import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveItem(listItem) {
  const savedImc = await getItems();
  listItem.id = new Date().getTime();
  savedImc.push(listItem);
  return AsyncStorage.setItem('imc', JSON.stringify(savedImc));
}

function getItems() {
  return AsyncStorage.getItem('imc').then((response) => {
    if (response) return Promise.resolve(JSON.parse(response));
    else return Promise.resolve([]);
  });
}

async function getItem(id) {
  const savedImc = await getItems();
  return savedImc.find((item) => item.id === id);
}

async function deleteItem(id) {
  let savedImc = await getItems();
  const index = await savedImc.findIndex((item) => item.id === id);
  savedImc.splice(index, 1);
  return AsyncStorage.setItem('imc', JSON.stringify(savedImc));
}

module.exports = {
  saveItem,
  getItems,
  getItem,
  deleteItem,
};
