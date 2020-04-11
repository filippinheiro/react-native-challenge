import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
} from "react-native";

import Likes from './components/Likes'

import api from './services/api'

export default function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    async function loadRepositories() {
      const { data } = await api.get('repositories')
      setRepositories(data)
    }
    loadRepositories()
  }, [])

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>

        <FlatList
          data={repositories}
          keyExtractor={repositories => repositories.id}
          renderItem={
            ({ item: repository }) => (
              <View style={styles.repositoryContainer}>
                <Text style={styles.repository}>{repository.title}</Text>

                <FlatList
                  style={styles.techsContainer}
                  data={repository.techs}
                  keyExtractor={tech => tech}
                  renderItem={({ item: tech }) => (
                    <>
                      <Text style={styles.tech}>
                        {tech}
                      </Text>
                    </>
                  )} />
                <Likes id={repository.id} currentLikes={repository.likes} />
              </View>
            )
          } />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
});
