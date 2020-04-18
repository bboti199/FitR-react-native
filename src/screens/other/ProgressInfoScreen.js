import React, {useCallback, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import {Headline, Menu, Title, Caption} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {fetchChartData} from '../../redux/routine/actions';
import {useFocusEffect} from '@react-navigation/native';

import LoadingSpinner from '../../components/LoadingSpinner';
import {Colors} from '../../styles/colors';

import Feather from 'react-native-vector-icons/Feather';
import ExerciseProgressCard from '../../components/exercises/ExerciseProgressCard';
import {globalStyles} from '../../styles/global';

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
    <View style={globalStyles.mainContainer}>
      <View style={globalStyles.titleContainer}>
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
      <View style={globalStyles.content}>
        <View style={styles.menuContainer} />
        {error ? (
          <View style={globalStyles.errorContainer}>
            <Title style={globalStyles.errorText}>{error}</Title>
          </View>
        ) : chartData && chartData.length !== 0 ? (
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
        ) : (
          <View style={globalStyles.errorContainer}>
            <Title>No progress data found for this routine</Title>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProgressInfoScreen;

const styles = StyleSheet.create({
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
