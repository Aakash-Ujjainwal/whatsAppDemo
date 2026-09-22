import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function StudentRecordApp() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [marks, setMarks] = useState('');
  const [editId, setEditId] = useState(null);

  // Add or Update student
  const handleAddOrUpdate = () => {
    if (!name || !roll || !marks) {
      return alert('Please fill all fields');
    }

    if (editId !== null) {
      // Update existing record
      const updated = students.map(student =>
        student.id === editId ? {...student, name, roll, marks} : student,
      );
      setStudents(updated);
      setEditId(null);
    } else {
      // Add new record
      const newStudent = {
        id: Date.now(),
        name,
        roll,
        marks,
      };
      setStudents([...students, newStudent]);
    }

    // Clear inputs
    setName('');
    setRoll('');
    setMarks('');
  };

  // Delete student
  const handleDelete = id => {
    setStudents(students.filter(student => student.id !== id));
  };

  // Edit student
  const handleEdit = student => {
    setEditId(student.id);
    setName(student.name);
    setRoll(student.roll);
    setMarks(student.marks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎓 Student Record Table</Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Student Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Roll Number"
          value={roll}
          onChangeText={setRoll}
          style={styles.input}
        />
        <TextInput
          placeholder="Marks"
          value={marks}
          onChangeText={setMarks}
          keyboardType="numeric"
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddOrUpdate}>
          <Text style={styles.buttonText}>
            {editId ? 'Update' : 'Add'} Student
          </Text>
        </TouchableOpacity>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.cell, styles.headerCell]}>Name</Text>
        <Text style={[styles.cell, styles.headerCell]}>Roll No</Text>
        <Text style={[styles.cell, styles.headerCell]}>Marks</Text>
        <Text style={[styles.cell, styles.headerCell]}>Actions</Text>
      </View>

      {/* Student List */}
      <FlatList
        data={students}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.tableRow}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.roll}</Text>
            <Text style={styles.cell}>{item.marks}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text style={styles.edit}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, marginTop: 40},
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {marginBottom: 20},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {color: '#fff', fontWeight: 'bold'},
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#ccc',
    paddingBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 8,
  },
  cell: {flex: 1, textAlign: 'center'},
  headerCell: {fontWeight: 'bold'},
  actions: {flexDirection: 'row', justifyContent: 'center', gap: 10, flex: 1},
  edit: {color: 'green', marginHorizontal: 5},
  delete: {color: 'red', marginHorizontal: 5},
});
