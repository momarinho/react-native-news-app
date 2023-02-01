import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import {
  NativeBaseProvider,
  FlatList,
  ScrollView,
  Divider,
  Image,
  Spinner,
} from 'native-base';

import { services } from '../services/services';
import moment from 'moment/moment';

const All = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    services('general')
      .then((data) => {
        setNewsData(data);
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }, []);

  return (
    <NativeBaseProvider>
      {newsData.length > 1 ? (
        <FlatList
          height={850}
          data={newsData}
          renderItem={({ item }) => (
            <View>
              <View style={styles.container}>
                <Image
                  width={550}
                  height={250}
                  resizeMode={'cover'}
                  source={{
                    uri: item.urlToImage,
                  }}
                  alt="Alternate Text"
                />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>
                  {moment(item.publishedAt).format('LLL')}
                </Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <Divider my={2} bg="#e0e0e0" />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={styles.spinner}>
          <Spinner color="danger.400" />
        </View>
      )}
    </NativeBaseProvider>
  );
};

export default All;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  date: {
    fontSize: 14,
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
});
