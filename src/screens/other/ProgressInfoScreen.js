import React, {useCallback, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import {Headline, Text, Menu, Button, Caption} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {fetchChartData} from '../../redux/routine/actions';
import {useFocusEffect} from '@react-navigation/native';

import LoadingSpinner from '../../components/LoadingSpinner';
import {Colors} from '../../styles/colors';

import Feather from 'react-native-vector-icons/Feather';
import ExerciseProgressCard from '../../components/exercises/ExerciseProgressCard';

const ProgressInfoScreen = ({navigation, route}) => {
  const routineId = route.params.routineId;
  const routineName = route.params.routineName;

  const [timePeriod, setTimePeriod] = useState('month');
  const [menuVisible, setMenuVisible] = useState(false);
  const dispatch = useDispatch();
  const chartData = useSelector(state => state.routines.chartData);
  const loading = useSelector(state => state.routines.chartDataFetching);
  const error = useSelector(state => state.routines.chartDataFetchError);

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const closeMenu = () => setMenuVisible(false);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchChartData(routineId, timePeriod));
    }, [dispatch, routineId, timePeriod]),
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  const captionString = () => {
    if (timePeriod === 'week') {
      return 'weekly';
    } else if (timePeriod === 'month') {
      return 'monthly';
    } else if (timePeriod === 'year') {
      return 'yearly';
    } else {
      return 'all';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={26} color={Colors.fgPrimary} />
        </TouchableOpacity>
        <View style={styles.title}>
          <Headline>{routineName}</Headline>
          <Caption>Showing {captionString()} data</Caption>
        </View>
        <View>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={toggleMenu}>
                <Feather name="filter" size={26} color={Colors.fgPrimary} />
              </TouchableOpacity>
            }>
            <Menu.Item
              title="Week"
              onPress={() => {
                setMenuVisible(false);
                setTimePeriod('week');
              }}
            />
            <Menu.Item
              title="Month"
              onPress={() => {
                setMenuVisible(false);
                setTimePeriod('month');
              }}
            />
            <Menu.Item
              title="Year"
              onPress={() => {
                setMenuVisible(false);
                setTimePeriod('year');
              }}
            />
            <Menu.Item
              title="All"
              onPress={() => {
                setMenuVisible(false);
                setTimePeriod('all');
              }}
            />
          </Menu>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.menuContainer} />
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={chartData}
            renderItem={({item}) => (
              <ExerciseProgressCard
                exercise={item.exercise}
                labels={item.date}
                weight={item.weight}
                workload={item.workload}
              />
            )}
            keyExtractor={item => item.exercise}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default ProgressInfoScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgSecondary,
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 15,
  },
  titleContainer: {
    backgroundColor: Colors.bgSecondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: -20,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: Colors.red,
  },
  menuContainer: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -10,
  },
});
