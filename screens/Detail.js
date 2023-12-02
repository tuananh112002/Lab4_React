import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const Detail = ({ route, navigation }) => {
  const { service } = route.params;
  const [editable, setEditable] = useState(false);
  const [editedService, setEditedService] = useState(service);

  const handleSave = () => {
    // Thực hiện lưu thông tin dịch vụ đã chỉnh sửa
    // Ở đây bạn có thể gọi hàm hoặc API để lưu thông tin
    // Sau khi lưu xong, có thể chuyển về màn hình trước đó hoặc làm điều gì đó khác
    setEditable(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Chi tiết dịch vụ</Text>
      <TextInput
        style={styles.input}
        value={editedService.name}
        editable={editable}
        onChangeText={(text) => setEditedService({ ...editedService, name: text })}
      />
      <TextInput
        style={styles.input}
        value={editedService.price}
        editable={editable}
        onChangeText={(text) => setEditedService({ ...editedService, price: text })}
      />
      {editable ? (
        <TouchableOpacity onPress={handleSave} style={styles.btnSave}>
          <Text style={styles.btnSaveText}>Lưu</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setEditable(true)} style={styles.btnEdit}>
          <Text style={styles.btnEditText}>Sửa</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  btnEdit: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnEditText: {
    color: '#fff',
    fontSize: 16,
  },
  btnSave: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnSaveText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Detail;
