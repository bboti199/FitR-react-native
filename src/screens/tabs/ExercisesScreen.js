import React, {useState, useCallback, useRef} from 'react';
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
import {useFocusEffect} from '@react-navigation/native';

import {Colors} from '../../styles/colors';
import HeaderLeftButton from '../../components/navigation/HeaderLeftButton';

import LoadingSpinner from '../../components/LoadingSpinner';

import {useDispatch, useSelector} from 'react-redux';
import {fetchExercises} from '../../redux/exercise/actions';

import Feather from 'react-native-vector-icons/Feather';

import {createFilter} from 'react-native-search-filter';
import ExerciseCard from '../../components/exercises/ExerciseCard';
import ExerciseModal from '../../components/exercises/ExerciseModal';
import {globalStyles} from '../../styles/global';

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

  useFocusEffect(
    useCallback(() => {
      if (exercises.length === 0 || modified) {
        dispatch(fetchExercises());
      }
    }, [dispatch, exercises.length, modified]),
  );

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
      <View style={globalStyles.mainContainer}>
        <StatusBar backgroundColor={Colors.bgSecondary} />
        <View style={globalStyles.titleContainer}>
          <HeaderLeftButton size={26} buttonStyle={{color: Colors.fgPrimary}} />
          <Headline>Exercises</Headline>
          <TouchableOpacity onPress={() => {}}>
            <Feather name="filter" size={26} color={Colors.fgPrimary} />
          </TouchableOpacity>
        </View>
        <View style={globalStyles.content}>
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

          {fetching ? (
            <View style={globalStyles.indicatorContainer}>
              <LoadingSpinner />
            </View>
          ) : !fetchError ? (
            <View style={styles.exerciseContainer}>
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
            </View>
          ) : (
            <View style={globalStyles.errorContainer}>
              <Text style={globalStyles.errorText}>{fetchError}</Text>
            </View>
          )}
        </View>
      </View>
    </Portal.Host>
  );
};

export default ExercisesScreen;

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 20,
  },
  separator: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.grey,
    marginBottom: 15,
    alignItems: 'center',
    marginHorizontal: 40,
  },
  exerciseInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  exerciseContainer: {
    marginTop: 20,
    marginVertical: 5,
    marginBottom: 50,
  },
  fab: {
    position: 'absolute',
    marginBottom: 20,
    marginRight: 20,
    right: 20,
    bottom: 60,
    backgroundColor: Colors.bluePrimary,
  },
});
