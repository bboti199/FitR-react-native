import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Card, Caption, Title, Paragraph} from 'react-native-paper';

import moment from 'moment';

const WorkoutLogCard = ({logData}) => {
  const momentDate = moment(logData.createdAt);

  return (
    <Card style={styles.cardStyle}>
      <Card.Content>
        <View style={styles.container}>
          <View>
            <Title>{logData.workout.name}</Title>
          </View>
          <View style={{alignItems: 'center'}}>
            <Title style={{fontWeight: 'bold'}}>
              {momentDate.format('ddd 🔥').toUpperCase()}
            </Title>
            <Paragraph>{momentDate.format('MMM DD')}</Paragraph>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default WorkoutLogCard;

const styles = StyleSheet.create({
  cardStyle: {
    marginVertical: 5,
    borderRadius: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
});
