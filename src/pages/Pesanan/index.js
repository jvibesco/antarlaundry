import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import {Picker} from '@react-native-picker/picker';

// const Pesanan = () => {
//   return (
//     <View>
//       <Text>Pesanan</Text>
//     </View>
//   )
// }

// export default Pesanan

const BASE_URL = 'http://192.168.100.9/ci-app/';

export default function Pesanan() {
  const [tasks, setTasks] = useState([]);
  const [email, setEmail] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [nama, setNama] = useState('');
  const [nrp, setNRP] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch('http://192.168.100.9/ci-app/mahasiswa/view')
      .then(response => response.json())
      .then(data => setTasks(data.mahasiswa))
      .catch(error => console.error(error));
  };

  // console.log(fetchTasks)

  const addTask = async () => {
    try {
      const response = await fetch(BASE_URL + 'mahasiswa/tambah_mahasiswa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nama: nama, nrp: nrp, jurusan: jurusan, email: email }),
      });
        fetchTasks();
        setNama('');
        setNRP('');
        setJurusan('');
        setEmail('');
    } catch (error) {
      console.error(error);
    }
  };

  const renderJurusanPickerItems = () => {
    const uniqueJurusan = [...new Set(tasks.map(item => item.jurusan))];
    return uniqueJurusan.map((item, index) => (
      <Picker.Item label={item} value={item} key={index} />
    ));
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.nama}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task Manager</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      
      <Picker
        style={styles.picker}
        selectedValue={jurusan}
        onValueChange={(itemValue, itemIndex) =>
          setJurusan(itemValue)
        }>
        {renderJurusanPickerItems()}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Nama"
        value={nama}
        onChangeText={text => setNama(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="NRP"
        value={nrp}
        onChangeText={text => setNRP(text)}
      />

      <Button title="Add Task" onPress={addTask} />

      <FlatList
        style={styles.list}
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  list: {
    marginTop: 20,
    width: '80%',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
})