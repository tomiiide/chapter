import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, FormControl } from '@material-ui/core';
import useFormStyles from '../shared/formStyles';

const fields = ['country_code', 'city', 'region', 'postal_code', 'address'];

interface IData {
  country_code: string;
  city: string;
  region: string;
  postal_code: string;
  address?: string;
}

interface ILocationFormProps {
  loading: boolean;
  onSubmit: (data: IData) => Promise<void>;
  data?: IData;
  submitText: string;
}

const LocationForm: React.FC<ILocationFormProps> = props => {
  const { loading, onSubmit, data, submitText } = props;

  const styles = useFormStyles();
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {fields.map(item => (
        <FormControl className={styles.item} key={item}>
          <Controller
            control={control}
            as={
              <TextField name={item} type="text" label={item} placeholder="" />
            }
            name={item}
            options={{ required: item !== 'address' }}
            defaultValue={data && data[item]}
          />
        </FormControl>
      ))}
      <Button
        className={styles.item}
        variant="contained"
        color="primary"
        type="submit"
        disabled={loading}
      >
        {submitText}
      </Button>
    </form>
  );
};

export default LocationForm;
