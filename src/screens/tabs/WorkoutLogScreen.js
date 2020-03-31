import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Headline, Title} from 'react-native-paper';

import {Colors} from '../../styles/colors';

import GestureRecognizer from 'react-native-swipe-gestures';

import {useSelector, useDispatch} from 'react-redux';
import {fetchLogs} from '../../redux/logs/actions';

import CalendarStrip from 'react-native-calendar-strip';
import HeaderLeftButton from '../../components/navigation/HeaderLeftButton';
import Feather from 'react-native-vector-icons/Feather';
import LoadingSpinner from '../../components/LoadingSpinner';
import WorkoutLogCard from '../../components/logs/WorkoutLogCard';
import moment from 'moment';

const WorkoutLogScreen = () => {
  const calendarRef = useRef(null);
  const fetching = useSelector(state => state.logs.fetching);
  const modified = useSelector(state => state.logs.modified);
  const logs = useSelector(state => state.logs.logs);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (logs === null || logs.length === 0 || modified) {
      dispatch(fetchLogs());
    }
  }, [dispatch, modified]);

  useEffect(() => {
    if (filteredLogs.length === 0) {
      filterData();
    }
  }, []);

  const filterData = () => {
    const startingDate = moment().startOf('isoweek');
    const endingDate = moment().endOf('isoWeek');

    const filteredData = logs.filter(logData => {
      let isValid = moment(logData.createdAt).isBetween(
        startingDate,
        endingDate,
      );
      return isValid;
    });

    setFilteredLogs(filteredData);
  };

  const onWeekChanged = data => {
    const startingDate = data;
    const endingDate = moment(data).add(7, 'days');

    const filteredData = logs.filter(logData => {
      let isValid = moment(logData.createdAt).isBetween(
        startingDate,
        endingDate,
      );
      return isValid;
    });

    setFilteredLogs(filteredData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <HeaderLeftButton size={26} buttonStyle={{color: Colors.fgPrimary}} />
        <Headline>Workout Logs</Headline>
        <TouchableOpacity
          onPress={() => {
            dispatch(fetchLogs());
          }}>
          <Feather name="refresh-cw" color={Colors.fgPrimary} size={26} />
        </TouchableOpacity>
      </View>
      <GestureRecognizer
        onSwipeLeft={() => calendarRef.current.getNextWeek()}
        onSwipeRight={() => calendarRef.current.getPreviousWeek()}
        config={{velocityThreshold: 0.1, directionalOffsetThreshold: 50}}
        style={styles.content}>
        <CalendarStrip
          style={styles.stripStyle}
          daySelectionAnimation={{
            type: 'border',
            duration: 100,
            borderWidth: 1,
            borderHighlightColor: Colors.green,
          }}
          dateNumberStyle={{color: Colors.fgPrimary}}
          dateNameStyle={{color: Colors.fgPrimary}}
          highlightDateNumberStyle={{color: Colors.green}}
          highlightDateNameStyle={{color: Colors.green}}
          calendarHeaderStyle={{color: Colors.fgPrimary}}
          ref={calendarRef}
          leftSelector={
            <Feather name="chevron-left" color={Colors.fgPrimary} size={26} />
          }
          rightSelector={
            <Feather name="chevron-right" color={Colors.fgPrimary} size={26} />
          }
          onWeekChanged={onWeekChanged}
          markedDates={logs.map(data => ({
            date: data.createdAt,
            dots: [
              {
                key: data.createdAt,
                color: Colors.green,
                selectedDotColor: Colors.bluePrimary,
              },
            ],
          }))}
        />

        {fetching ? (
          <View style={styles.indicatorContainer}>
            <LoadingSpinner />
          </View>
        ) : logs.length === 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Title>You did not complete a workout yet.</Title>
          </View>
        ) : (
          <View style={styles.cardContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filteredLogs}
              keyExtractor={item => item._id}
              renderItem={({item}) => <WorkoutLogCard logData={item} />}
            />
          </View>
        )}
      </GestureRecognizer>
    </View>
  );
};

export default WorkoutLogScreen;

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
    marginHorizontal: -10,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  stripStyle: {
    height: Dimensions.get('screen').height * 0.17,
    backgroundColor: '#151515',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  cardContainer: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  indicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
