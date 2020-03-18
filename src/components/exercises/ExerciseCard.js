import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Card, Paragraph, Title} from 'react-native-paper';

import {useDispatch} from 'react-redux';
import {deleteExercise} from '../../redux/exercise/actions';

import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '../../styles/colors';

const ExerciseCard = ({exercise}) => {
  const dispatch = useDispatch();

  const RightActions = () => {
    return (
      <TouchableOpacity
        onPress={() => dispatch(deleteExercise(exercise._id))}
        disabled={exercise.owner === null}
        style={{
          ...styles.rightActionContainer,
          backgroundColor: exercise.owner === null ? '#ed8f85' : Colors.red,
        }}>
        <Feather name="trash-2" size={24} style={styles.actionText} />
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={RightActions} overshootRight={false}>
      <Card style={styles.cardStyle}>
        <Card.Content>
          <View style={styles.container}>
            <Title>{exercise.name}</Title>
            <View style={styles.infoContainer}>
              <Paragraph>{exercise.bodyPart}</Paragraph>
              <Paragraph>{exercise.type}</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>
    </Swipeable>
  );
};

export default ExerciseCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardStyle: {
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: Colors.bgSecondary,
  },
  rightActionContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: 6,
    borderRadius: 20,
  },
  actionText: {
    color: '#fff',
  },
});
