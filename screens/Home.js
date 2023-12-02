import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal,
    // Image
} from 'react-native';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

//const Tab = createBottomTabNavigator();

const Home = ({ navigation }) => {
    const [serviceList, setServiceList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [editingService, setEditingService] = useState(null);

    const [serviceName, setServiceName] = useState('');
    const [servicePrice, setServicePrice] = useState('');

    useEffect(() => {
        getList();
    }, []);

    const getList = () => {
        // Mock data
        const data = [
            { id: 1, name: 'Dịch vụ A', price: '100,000 VND' },
            { id: 2, name: 'Dịch vụ B', price: '150,000 VND' },
            // ...Thêm dữ liệu khác
        ];

        setServiceList(data);
    };

    const handleServicePress = (service) => {
        navigation.navigate('Detail', { service });
    };

    const handleEditService = (service) => {
        setEditingService(service);
        setServiceName(service.name);
        setServicePrice(service.price);
        setVisible(true);
    };

    const handleDeleteService = (service) => {
        const updatedServiceList = serviceList.filter(
            (existingService) => existingService.id !== service.id
        );

        setServiceList(updatedServiceList);
    };

    const handleSave = () => {
        if (editingService) {
            // Editing an existing service
            const updatedServiceList = serviceList.map((service) =>
                service.id === editingService.id
                    ? { ...service, name: serviceName, price: servicePrice }
                    : service
            );

            setServiceList(updatedServiceList);
            setEditingService(null);
        } else {
            // Adding a new service
            if (serviceName && servicePrice) {
                const newService = {
                    id: serviceList.length + 1,
                    name: serviceName,
                    price: servicePrice,
                };

                setServiceList([...serviceList, newService]);
            } else {
                alert('Vui lòng nhập đầy đủ thông tin dịch vụ.');
            }
        }

        // Reset input values and hide modal
        setServiceName('');
        setServicePrice('');
        setVisible(false);
    };

    const handleVisibleModal = () => {
        setEditingService(null);
        setServiceName('');
        setServicePrice('');
        setVisible(!visible);
    };

    // const link = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"

    return (
        <SafeAreaView style={styles.container}>
            {/* <Image style={styles.logo} source={{ uri: link }} /> */}
            <View style={styles.headerContainer}>
                <Text style={styles.mainText}>Danh sách dịch vụ</Text>
                <TouchableOpacity
                    onPress={handleVisibleModal}
                    style={styles.btnAddContainer}
                >
                    <Text style={styles.textButton}>
                        {editingService ? 'Cập nhật' : 'Thêm dịch vụ'}
                    </Text>
                </TouchableOpacity>
            </View>

            <Modal animationType="slide" visible={visible}>
                <SafeAreaView>
                    <View style={styles.form}>
                        <TouchableOpacity onPress={handleVisibleModal}>
                            <Text style={styles.txtClose}>Đóng</Text>
                        </TouchableOpacity>
                        <TextInput
                            value={serviceName}
                            style={styles.textInput}
                            placeholder="Tên dịch vụ"
                            onChangeText={(text) => setServiceName(text)}
                        />
                        <TextInput
                            value={servicePrice}
                            style={styles.textInput}
                            placeholder="Giá tiền"
                            onChangeText={(text) => setServicePrice(text)}
                        />
                        <TouchableOpacity onPress={handleSave} style={styles.btnContainer}>
                            <Text style={styles.textButton}>
                                {editingService ? 'Cập nhật' : 'Lưu'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>

            <ScrollView>
                {serviceList.map((service) => (
                    <View key={service.id} style={styles.itemService}>
                        <TouchableOpacity
                            onPress={() => handleServicePress(service)}
                            style={styles.serviceInfo}
                        >
                            <Text style={styles.txtName}>{service.name}</Text>
                            <Text style={styles.txtPrice}>{service.price}</Text>
                        </TouchableOpacity>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.editButton]}
                                onPress={() => handleEditService(service)}
                            >
                                <Text style={styles.buttonText}>Sửa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.deleteButton]}
                                onPress={() => handleDeleteService(service)}
                            >
                                <Text style={styles.buttonText}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const DetailScreen = ({ route }) => {
    const { service } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>Chi tiết dịch vụ</Text>
            <Text style={styles.detailText}>Tên: {service.name}</Text>
            <Text style={styles.detailText}>Giá: {service.price}</Text>
        </View>
    );
};

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Detail" component={DetailScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        padding: 15,
        backgroundColor: '#eeeeee',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mainText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    btnAddContainer: {
        padding: 10,
        backgroundColor: '#000',
    },
    textButton: {
        textAlign: 'center',
        color: '#FFF',
    },
    form: {
        padding: 15,
        marginTop: 10,
    },
    txtClose: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'right',
    },
    textInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        marginTop: 10,
    },
    btnContainer: {
        display: 'flex',
        padding: 15,
        backgroundColor: '#000',
        marginTop: 20,
    },
    itemService: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e2e2',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    serviceInfo: {
        flex: 1,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    button: {
        padding: 8,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    editButton: {
        backgroundColor: '#4CAF50',
    },
    deleteButton: {
        backgroundColor: '#F44336',
    },
    buttonText: {
        color: 'white',
    },
    txtName: {
        fontSize: 18,
        marginTop: 5,
        fontWeight: 'bold',
    },
    txtPrice: {
        fontSize: 14,
        marginTop: 5,
    },
    logo: {
        width: 170,
        height: 150,
        alignSelf: 'center',
        marginBottom: 20
    }
});

export default Home;
