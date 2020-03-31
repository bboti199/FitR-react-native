import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';

import Animated, {Easing, Extrapolate} from 'react-native-reanimated';

import {Colors} from '../../styles/colors';

import moment from 'moment';

const WorkoutLogCard = ({logData}) => {
  const momentDate = moment(logData.createdAt);
  const [opacityAnimated] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacityAnimated, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
      easing: Easing.cubic,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: opacityAnimated,
        transform: [
          {
            scaleX: opacityAnimated.interpolate({
              inputRange: [0, 1],
              outputRange: [0.75, 1],
              extrapolate: Extrapolate.CLAMP,
            }),
          },
        ],
      }}>
      <View style={styles.cardStyle}>
        <Card.Content>
          <View style={styles.container}>
            <View>
              <Title>{logData.routine.name}</Title>
            </View>
            <View style={{alignItems: 'center'}}>
              <Title style={{fontWeight: 'bold'}}>
                {momentDate.format('ddd 🔥').toUpperCase()}
              </Title>
              <Paragraph>{momentDate.format('MMM DD')}</Paragraph>
            </View>
          </View>
        </Card.Content>
      </View>
    </Animated.View>
  );
};

export default WorkoutLogCard;

const styles = StyleSheet.create({
  cardStyle: {
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: Colors.bgSecondary,
    paddingVertical: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
});
