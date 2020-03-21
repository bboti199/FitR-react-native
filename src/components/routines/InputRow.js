import React, {Fragment} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

import NumericInput from '@wwdrew/react-native-numeric-textinput';
import {Colors} from '../../styles/colors';

const InputRow = ({reps, weight, updateRepsAtIndex, idx}) => {
  return (
    <Fragment>
      <NumericInput
        style={styles.input}
        type="decimal"
        decimalPlaces={0}
        value={reps}
        onUpdate={value => updateRepsAtIndex(idx, value)}
      />
      <TextInput
        style={styles.input}
        placeholder="0"
        placeholderTextColor={Colors.fgPrimary}
        value={weight ? weight : ''}
      />
    </Fragment>
  );
};

export default InputRow;

const styles = StyleSheet.create({
  input: {
    color: Colors.fgPrimary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.fgPrimary,
    marginVertical: 2,
    paddingVertical: 2,
    paddingHorizontal: 10,
    textAlign: 'center',
    borderRadius: 10,
    marginHorizontal: 2,
  },
});
