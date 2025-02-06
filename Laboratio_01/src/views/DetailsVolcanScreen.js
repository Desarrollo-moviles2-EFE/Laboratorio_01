import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';
import styles from '../styles/stylesvolcanes';

const DetailsVolcanScreen = () => {
  const [volcanes, setVolcanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolcanes = async () => {
      try {
        const response = await axios.get('http://192.168.100.8:5005/volcan');
        setVolcanes(response.data);
      } catch (err) {
        setError('Error al cargar los volcanes');
      } finally {
        setLoading(false);
      }
    };

    fetchVolcanes();
  }, []);

  const renderVolcan = ({ item }) => (
    <View style={styles.volcanContainer}>
      <Text style={styles.title}>{item.nombre}</Text>
      <Image
        source={{ uri: item.imagen }}
        style={styles.image}
        onError={(e) => console.log('Error al cargar la imagen:', e.nativeEvent.error)}
      />
      <Text style={styles.text}><Text style={styles.bold}>Ubicación:</Text> {item.ubicacion}</Text>
      <Text style={styles.text}><Text style={styles.bold}>Altura:</Text> {item.altura} m</Text>
      <Text style={styles.text}><Text style={styles.bold}>Descripción:</Text> {item.descripcion}</Text>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={volcanes}
        renderItem={renderVolcan}
        keyExtractor={item => item._id}
        contentContainerStyle={{ paddingBottom: 50 }} // Espacio extra en la parte inferior
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        getItemLayout={(data, index) => (
          { length: 300, offset: 300 * index, index }
        )}
      />
    </View>
  );
};

export default DetailsVolcanScreen;
