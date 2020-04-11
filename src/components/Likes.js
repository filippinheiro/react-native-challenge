import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api'

export default function Like({ id, currentLikes }) {

  const [likes, setLikes] = useState(0)

  useEffect(() => {
    async function loadLikes() {
      setLikes(currentLikes)
    }
    loadLikes()
  }, [])

  async function handleLikeRepository() {
    const { data } = await api.post(`repositories/${id}/like`)
    console.log(id)
    setLikes(data.likes)
  }

  return (
    <>
      < View style={styles.likesContainer}>
        {likes === 1 &&
          <Text
            style={styles.likeText}
            // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
            testID={`repository-likes-${id}`}>
            {likes} curtida
        </Text>}
        {likes !== 1 &&
          <Text
            style={styles.likeText}
            // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
            testID={`repository-likes-${id}`}>
            {likes} curtidas
        </Text>}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLikeRepository(1)}
        // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
        testID={`like-button-${id}`}
      >
        <Text style={styles.buttonText}>Curtir</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    borderRadius: 4,
    backgroundColor: "#7159c1",
    padding: 15,
  },
})