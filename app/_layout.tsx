import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from '../navigation/StackNavigator';

import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

import { NavigationIndependentTree } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  dataText: { fontSize: 16, color: '#333' },
  errorText: { color: 'red', fontSize: 16 },
});

const App: React.FC = () => {
  //Uncomment this section to test the API (works as of 06/11 - 16:40)
  /*
  const [data, setData] = useState(null);      // State to store API data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null);     // State to handle errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.jsdu9873.tech/api/usuarios');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json(); // Parse JSON response
        setData(jsonData);                      // Store data in state
      } catch (error) {
        setError(error.message);                // Handle errors
      } finally {
        setLoading(false);                      // End loading state
      }
    };

    fetchData();
  }, []);

  // Loading or error states
  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View style={styles.container}>
      {data ? (
        <Text style={styles.dataText}>{JSON.stringify(data, null, 2)}</Text>
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
  
 
  // TODO: use "useEffect" to avoid crashing when user explores the video
  /*
  const player = useVideoPlayer('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', player => {
    player.loop = true;
    player.play();
  });

  return (
    <VideoView 
      style={{
        width: 350,
        height: 275
      }}
      player={player}
      allowsFullscreen
      allowsPictureInPicture
      nativeControls
    />
  );
  */

  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
};

export default App;