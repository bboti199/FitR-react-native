import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';

import {Colors} from '../../styles/colors';

const ExerciseSelectionCard = ({exercise, addToList}) => {
  return (
    <TouchableOpacity onPress={() => addToList(exercise)}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.container}>
            <Title>{exercise.name}</Title>
            <Paragraph>
              {exercise.bodyPart}, {exercise.type}
            </Paragraph>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default ExerciseSelectionCard;

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: Colors.bgSecondary,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
