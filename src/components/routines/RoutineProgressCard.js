import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Title, Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '../../styles/colors';

const RoutineProgressCard = ({routine}) => {
  const navigation = useNavigation();

  return (
    <Card style={styles.cardStyle}>
      <Card.Content>
        <View style={styles.itemStyle}>
          <Title>{routine.name}</Title>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProgressInfoScreen', {routine})
            }>
            <Feather name="chevron-right" size={22} color={Colors.fgPrimary} />
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );
};

export default RoutineProgressCard;

const styles = StyleSheet.create({
  cardStyle: {
    marginVertical: 5,
    borderRadius: 20,
    marginHorizontal: 5,
    paddingVertical: 10,
  },
  itemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
});
