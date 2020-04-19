import React, {useRef, useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Headline, Title} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';

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
import {globalStyles} from '../../styles/global';

const WorkoutLogScreen = () => {
  const calendarRef = useRef(null);
  const fetching = useSelector(state => state.logs.fetching);
  const modified = useSelector(state => state.logs.modified);
  const logs = useSelector(state => state.logs.logs);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      if (logs.length === 0 || modified) {
        dispatch(fetchLogs());
      } else {
        filterData();
      }
    }, [dispatch, modified, logs.length]),
  );

  const filterData = (
    startingDate = moment().startOf('isoWeek'),
    endingDate = moment().endOf('isoWeek'),
  ) => {
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

    filterData(startingDate, endingDate);
  };

  return (
    <View style={globalStyles.mainContainer}>
      <View style={globalStyles.titleContainer}>
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
        style={globalStyles.content}>
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
          <View style={globalStyles.indicatorContainer}>
            <LoadingSpinner />
          </View>
        ) : logs.length === 0 ? (
          <View style={styles.messageContainer}>
            <Title>You did not complete a workout yet.</Title>
          </View>
        ) : (
          <View style={styles.cardContainer}>
            {filteredLogs.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredLogs}
                keyExtractor={item => item._id}
                renderItem={({item}) => <WorkoutLogCard logData={item} />}
              />
            ) : (
              <View style={styles.messageContainer}>
                <Title>You do not have a workout for this week.</Title>
              </View>
            )}
          </View>
        )}
      </GestureRecognizer>
    </View>
  );
};

export default WorkoutLogScreen;

const styles = StyleSheet.create({
  stripStyle: {
    height: Dimensions.get('screen').height * 0.17,
    backgroundColor: '#151515',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: -15,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  cardContainer: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
