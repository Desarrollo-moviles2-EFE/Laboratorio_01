import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import styles from '../styles/styleGallery';
import axios from 'axios';

const VolcanImagesScreen = () => {
  const [volcanes, setVolcanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolcanes = async () => {
      try {
        const response = await axios.get('http://192.168.100.8:5005/volcan');
        setVolcanes(response.data);
      } catch (err) {
        setError('Error al cargar las imágenes de los volcanes');
      } finally {
        setLoading(false);
      }
    };

    fetchVolcanes();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  const renderImage = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.imagen }} style={styles.image} />
    </View>
  );

  return (
    <FlatList
      data={volcanes}
      renderItem={renderImage}
      keyExtractor={item => item._id}
      contentContainerStyle={styles.container}
      numColumns={2} // Esto organiza las imágenes en 2 columnas
    />
  );
};

export default VolcanImagesScreen;
