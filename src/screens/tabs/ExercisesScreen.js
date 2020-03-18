import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Headline,
  Title,
  Searchbar,
  Text,
  Portal,
  FAB,
} from 'react-native-paper';

import {Colors} from '../../styles/colors';
import HeaderLeftButton from '../../components/navigation/HeaderLeftButton';

import LoadingSpinner from '../../components/LoadingSpinner';

import {useDispatch, useSelector} from 'react-redux';
import {fetchExercises} from '../../redux/exercise/actions';

import Feather from 'react-native-vector-icons/Feather';

import {createFilter} from 'react-native-search-filter';
import ExerciseCard from '../../components/exercises/ExerciseCard';
import ExerciseModal from '../../components/exercises/ExerciseModal';

const ExercisesScreen = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [scrolledDown, setScrolledDown] = useState(false);
  const exercises = useSelector(state => state.exercises.exercises);
  const fetching = useSelector(state => state.exercises.fetching);
  const fetchError = useSelector(state => state.exercises.fetchError);
  const modified = useSelector(state => state.exercises.modified);

  const listRef = useRef();

  const goToListTop = () => {
    listRef.current.scrollToOffset({animated: true, offset: 0});
    setScrolledDown(false);
  };

  const onRefreshing = useCallback(() => {
    setRefreshing(true);
    setScrolledDown(false);

    dispatch(fetchExercises());

    if (!fetching) {
      setRefreshing(false);
    }
  }, [dispatch, fetching]);

  useEffect(() => {
    if (exercises.length === 0) {
      dispatch(fetchExercises());
    }
    if (modified) {
      dispatch(fetchExercises());
    }
  }, [dispatch, exercises.length, modified]);

  const filteredExercises = exercises.filter(
    createFilter(query, ['name', 'bodyPart']),
  );

  return (
    <Portal.Host>
      <ExerciseModal visible={modalVisible} setVisible={setModalVisible} />
      <Portal>
        <FAB
          style={styles.fab}
          visible={!fetching}
          icon={scrolledDown ? 'chevron-up' : 'plus'}
          onPress={() => {
            if (scrolledDown) {
              goToListTop();
            } else {
              setModalVisible(true);
            }
          }}
        />
      </Portal>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.bgSecondary} />
        <View style={styles.titleContainer}>
          <HeaderLeftButton size={26} buttonStyle={{color: Colors.fgPrimary}} />
          <Headline>Exercises</Headline>
          <TouchableOpacity onPress={() => {}}>
            <Feather name="filter" size={26} color={Colors.fgPrimary} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.searchBar}>
            <Searchbar
              placeholder="Search exercises..."
              placeholderTextColor={Colors.fgPrimary}
              value={query}
              onChangeText={text => setQuery(text)}
              style={{borderRadius: 20}}
            />
          </View>
          <View style={styles.separator} />
          <View style={styles.exerciseInfoContainer}>
            <Title>Total: {filteredExercises.length}</Title>
            <TouchableOpacity onPress={() => dispatch(fetchExercises())}>
              <Feather name="refresh-cw" size={26} color={Colors.fgPrimary} />
            </TouchableOpacity>
          </View>
          <View style={styles.exerciseContainer}>
            {fetching ? (
              <View style={styles.indicatorContainer}>
                <LoadingSpinner />
              </View>
            ) : !fetchError ? (
              <FlatList
                style={{marginBottom: 50}}
                data={filteredExercises}
                renderItem={({item}) => <ExerciseCard exercise={item} />}
                keyExtractor={item => item._id}
                refreshing={refreshing}
                onRefresh={onRefreshing}
                showsVerticalScrollIndicator={false}
                ref={listRef}
                onScrollEndDrag={() => setScrolledDown(true)}
              />
            ) : (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{fetchError}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Portal.Host>
  );
};

export default ExercisesScreen;

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
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  searchBar: {
    marginBottom: 20,
  },
  separator: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.grey,
    marginBottom: 15,
    alignItems: 'center',
    marginHorizontal: 60,
  },
  exerciseInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  errorText: {
    color: Colors.red,
  },
  errorContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseContainer: {
    marginTop: 20,
    marginVertical: 5,
    marginBottom: 50,
  },
  indicatorContainer: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 250,
  },
  fab: {
    position: 'absolute',
    marginBottom: 20,
    marginRight: 20,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.bluePrimary,
  },
});
