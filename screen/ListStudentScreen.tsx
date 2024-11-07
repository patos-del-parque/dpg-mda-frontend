import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet,Text, TouchableOpacity } from 'react-native';
import UserCard from '../components/UserCard';
import { FontAwesome } from '@expo/vector-icons';

const ListStudentScreen: React.FC = () => {
  const users = [
    { name: 'Mario Medina Lopez', email: 'juan@example.com' },
    { name: 'Carlos Fernandez Arrabal', email: 'ana@example.com' },
    { name: 'Silvia Fernandez Arrabal', email: 'luis@example.com' },
    { name: 'Ana López', email: 'ana.lopez@example.com' },
    { name: 'Pedro Pérez', email: 'pedro.perez@example.com' },
    { name: 'Lucía García', email: 'lucia.garcia@example.com' },
    { name: 'Juan Gómez', email: 'juan.gomez@example.com' },
    { name: 'Elena Martín', email: 'elena.martin@example.com' },
    { name: 'Jorge Ruiz', email: 'jorge.ruiz@example.com' },
  ];

  const [verifiedUsers, setVerifiedUsers] = useState<string[]>([]); 


  const groupedUsers = [];
  for (let i = 0; i < users.length; i += 3) {
    groupedUsers.push(users.slice(i, i + 3));
  }

  const toggleVerification = (email: string) => {
    setVerifiedUsers((prev) =>
      prev.includes(email)
        ? prev.filter((userEmail) => userEmail !== email)
        : [...prev, email]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>MENÚ 1</Text>

        {groupedUsers.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((user, index) => (
              <View key={index} style={styles.userCardContainer}>
                <UserCard name={user.name} urlPhoto={user.email} />
                
                <TouchableOpacity
                  style={styles.checkIcon}
                  onPress={() => toggleVerification(user.email)}
                >
                  {verifiedUsers.includes(user.email) ? (
                    <FontAwesome name="check-circle" size={24} color="green" />
                  ) : (
                    <FontAwesome name="circle-o" size={24} color="gray" />
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#00000',
    marginBottom: 20,
    textAlign: 'center',
  },
  userCardContainer: {
    alignItems: 'center', 
    position: 'relative',
  },
  checkIcon: {
    marginTop: 10,
  },
});

export default ListStudentScreen;



