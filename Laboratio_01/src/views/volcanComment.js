import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

const CommentsScreen = () => {
  const [volcanes, setVolcanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
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

  const handleAddComment = async (volcanId) => {
    const newCommentData = {
      comentario: newComment,
      fecha: new Date().toISOString(), // Formato de fecha actual
    };

    try {
      await axios.post(`http://192.168.100.8:5005/volcan/comentario`, newCommentData);
      setNewComment('');
      // Refrescar los comentarios
      const response = await axios.get('http://192.168.100.8:5005/volcan');
      setVolcanes(response.data);
    } catch (err) {
      setError('Error al agregar comentario');
    }
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentText}>{item.comentario}</Text>
      <Text style={styles.commentDate}>{new Date(item.fecha).toLocaleString()}</Text>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comentarios</Text>

      {volcanes.map((volcan) => (
        <View key={volcan._id}>
          <Text style={styles.volcanTitle}>{volcan.nombre}</Text>
          <FlatList
            data={volcan.comentarios}
            renderItem={renderComment}
            keyExtractor={(item, index) => index.toString()}
            style={styles.commentList}
          />

          <TextInput
            style={styles.input}
            placeholder="Agregar un comentario..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <Button title="Agregar comentario" onPress={() => handleAddComment(volcan._id)} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  volcanTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  commentList: {
    marginBottom: 20,
  },
  commentContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  commentText: {
    fontSize: 16,
    marginBottom: 5,
  },
  commentDate: {
    fontSize: 12,
    color: '#555',
    textAlign: 'right',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CommentsScreen;
